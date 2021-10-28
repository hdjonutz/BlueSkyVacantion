import 'reflect-metadata';
import {Observable, ReplaySubject} from 'rxjs';
import {ApiService} from './api_service';
import {Logger} from '../util/logger';
import {KJUR, Token} from 'jsrsasign'
import { resolve, useInjection } from 'inversify-react';
import {provideSingleton} from './inversify.config';
import {Container, injectable, inject} from "inversify";
import {VersionService} from "./version_service";
import {lazyInject} from "./inversify.config";
// import Cookie from 'tiny-cookie';

const logger = Logger.create('AuthenticationService');

export interface PermissionSet {
    readonly permissions?: ReadonlyArray<string>;

    hasPermission(name: string): boolean;
    isServiceMode(): boolean;
}

/**
 * Defines the current authentication, containing username, mandant and the access token.
 */
export class Authentication implements PermissionSet {
    private permissionsLookup: Set<string>;

    constructor(public readonly username: string,
                public readonly parsedAccessToken?: Token,
                public readonly accessToken?: string,
                public readonly expires?: Date,
                public readonly permissions?: ReadonlyArray<string>) {
        this.permissionsLookup = new Set<string>(permissions || []);
    }

    hasPermission(name: string): boolean {
        // Im Service-Mode kann man alles machen, sonst Permissions aus Token prüfen:
        return this.isServiceMode() || this.permissionsLookup.has(name);
    }

    isServiceMode(): boolean {
        // Erst einmal ist der service Nutzer der einzige Nutzer der alles Machen kann und den Service-Mode aktiviert.
        return this.username === 'service';
    }
}

/**
 * Service to control and access the current authentication to access the server services.
 */

@injectable()
export class AuthenticationService {
    private readonly authenticationSubject: ReplaySubject<Authentication> = new ReplaySubject<Authentication>(1);

    // @resolve(ApiService)             private apiService: ApiService;
    // @resolve(VersionService)         private versionService: VersionService;

    // private apiService: ApiService;

    private constructor(@inject('ApiService') private apiService: ApiService) {
        // this.apiService = apiService;

        // https://www.youtube.com/watch?v=nk3wUKxVDAg&ab_channel=ProgrammingwithKarthik
        
        window.addEventListener('storage', (e) => {
            if (e.key === 'accessToken') {
                this.isAuthenticated().first().subscribe((isAuthenticated) => {
                    if (e.newValue == null && isAuthenticated) {
                        this.logout();
                    } else if (e.newValue != null && !isAuthenticated) {
                        this.applyExternalLogin(e.newValue);
                    }
                });
            }

            if (e.key === 'logout' && localStorage.getItem('logout') === 'true') {
                logger.info('Received logout event! FOM ANOTHER OR THE SAME TAB!!!');
                this.logout().subscribe(() => {
                    debugger;
                    /*if (InLine.Login) {
                        InLine.Login.showLoginView();
                    }*/
                })
            }
        });

        // Load the authentication from the last browser session. We might still have one sitting around in local
        // storage.
        if (localStorage['accessToken']) {
            this
                .applyExternalLogin(localStorage['accessToken'])
                .subscribe(() => logger.info('Restored stored login'));
        } else {
            this.authenticationSubject.next(null);
        }
    }

    /**
     * Retrieve the current login. Might be null if there isn't a login
     * @return {ReplaySubject<Authentication>}
     */
    getAuthentication(): Observable<Authentication> {
        return this.authenticationSubject;
    }

    /**
     * Retrieves whether the user is currently logged in.'logout-event'
     * @return {any}
     */
    isAuthenticated(): Observable<boolean> {
        return this.getAuthentication().map((a) => a != null);
    }

    /**
     * Apply an external retrieved access token as a login. The method parses the claims from the access token and
     * establish a authentication.
     * @param accessToken
     * @return {Observable<Authentication>}
     */
    applyExternalLogin(accessToken: string): Observable<Authentication> {
        // We can't check here if the token is valid, as we don't know the secret on client side because it is secret 😉,
        // but we need to parse the token to get the mndNr and the username.
        // Checking the experience time would be possible, but isn't a big help here. Just let it fail at the api.

        try {
            const parsedAccessToken = KJUR.jws.JWS.parse(accessToken);

            if (!parsedAccessToken.headerObj || !parsedAccessToken.payloadObj || !parsedAccessToken.sigHex) {
                // Errror on upgrade application
                // old application from test to production.(the token is already saved)
                logger.warn('Access token not valid, refreshing authentication', accessToken);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('logout_accessToken');
                localStorage.removeItem('logout');
                throw new Error('Error while parsing access token')
            }

            const username = parsedAccessToken.payloadObj.sub;
            const expires = parsedAccessToken.payloadObj.exp ? new Date(+parsedAccessToken.payloadObj.exp * 1000) : null;
            const permissions = parsedAccessToken.payloadObj.rechte ? parsedAccessToken.payloadObj.rechte : [];
            const authentication = new Authentication(username, parsedAccessToken, accessToken, expires, permissions);

            localStorage['accessToken'] = accessToken;
            localStorage.setItem('logout', 'false');

            logger.info('Login parsed, is:', authentication);

            this.authenticationSubject.next(authentication);

            return this.getAuthentication().first();
        } catch (err) {
            // Errror on upgrade application
            // old application from test to production.(the token is already saved)
            localStorage.removeItem('accessToken');
            localStorage.removeItem('logout_accessToken');
            localStorage.removeItem('logout');
            console.error('Error while parsing access token', accessToken, err);
            this.authenticationSubject.next(null);
            return this.getAuthentication().first();
        }
    }

    activateAccount(accessToken: string): Observable<any> {
        try {
            const parsedAccessToken = KJUR.jws.JWS.parse(accessToken);
            const obj: any  = parsedAccessToken.payloadObj;
            const expirate  = new Date(obj.exp * 1000);
            const create    = new Date(obj.iat * 1000);
            const info      = window.atob(obj.sub).split('#-#');
            const detail = {
                expirate:   expirate,
                create:     create,
                tid:        window.atob(info[0]),
                name:       window.atob(info[1]),
                vorname:    window.atob(info[2]),
                email:      window.atob(info[3])
            };
            return Observable.of(detail);
        } catch (err) {
            return Observable.of(null);
        }
    }

    /**
     * Applies a legacy login (e.g. the old cookie from Tomcat, or a login via local config) with mandant and username,
     * however this mean that no access token is available and requires the API & co to work without one. Otherwise the
     * user can't do anything.
     * @param accessToken
     */
    applyExternalLegacyLogin(username: string, permissions?: ReadonlyArray<string>): Observable<Authentication> {
        const authentication = new Authentication(username, null, null, null, permissions || null);
        localStorage['accessToken'] = 'legacy';
        logger.warn('Legacy login, this will not work in the future, is:', authentication);

        this.authenticationSubject.next(authentication);
        return this.getAuthentication().first();
    }

    /**
     * Performs a login with mndNr, username and password.
     * @param username
     * @param password
     * @return {any}
     */
    login(username: string, password: string): any /*Observable<Authentication>*/ {
        console.log(this);
        
        return this.apiService
            .post('getAuthenticationUser', {email: username, pass: password})
            .switchMap((response) => {
                if (+response.data['granted'] === 1) {
                    logger.info('Logged in successfully', response.data['access_token']);

                    return this.applyExternalLogin(response.data['access_token']);
                } else {
                    logger.warn('Login failed');
                    return Observable.of(null);
                }
            });
    }

    /**
     * Logout from the current authentication, which more or less means to forget it.
     * @return {any}
     */
    logout(): Observable<boolean> {
        return this.getAuthentication().first().map((auth) => {
            if (auth != null) {
                // As there is no server side session, we only need to forget our token to perform a logout:
                this.authenticationSubject.next(null);
                localStorage.removeItem('accessToken');
                localStorage.setItem('logout_accessToken', auth.accessToken);
                window.sessionStorage.removeItem('InLine.ForceAccessMode');
                localStorage.removeItem('LoginLastUsername');
                localStorage.removeItem('LoginLastMndNr');
                logger.info('Logout completed');
                localStorage.setItem('logout', 'true');
                    console.log('DELETE COOKIES LOGOUT');
                    // Cookie.remove('access_token');
                    // Cookie.remove('io');
                    // Cookie.remove('mnd');
                    // Cookie.remove('user');
                    // Cookie.remove('wwwstamp');

                return true;
            } else {
                return false;
            }
        });
    }

    /**
     * Refresh the current authentication session in case the API indicated that the login isn't valid anymore (e.g.
     * via status 401). Returns the new authentication ones one is established.
     * @return {any}
     */
    refreshLogin(): Observable<Authentication> {
        logger.info('Refreshing login...');

        // Remove authentication and await a new login (which isn't controlled here...)
        return this.logout().switchMap(() => this.getAuthentication().filter((auth) => auth != null).first());
    }

    getPermissionfromToken(token: string): any {
        const parsedAccessToken = KJUR.jws.JWS.parse(token);

        if (!parsedAccessToken.headerObj || !parsedAccessToken.payloadObj || !parsedAccessToken.sigHex) {
            return [];
        }
        return parsedAccessToken.payloadObj.rechte ? parsedAccessToken.payloadObj.rechte : [];
    }

}
