///<reference path="../../node_modules/inversify/lib/annotation/injectable.d.ts"/>
import 'reflect-metadata';
import {Logger} from '../util/logger';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication_service';
import {ApiService, Parameters, ApiResponse, ResponseFormat} from './api_service';
import { injectable, inject} from 'inversify';
const logger = Logger.create('AuthorizedApiService');

@injectable()
export class AuthorizedApiService {
    private constructor(
        @inject('ApiService')               private apiService: ApiService,
        @inject('AuthenticationService')    private authenticationService: AuthenticationService) {}

    get<T = any>(key: string, parameters?: Parameters, format: ResponseFormat = 'json',
                 type: XMLHttpRequestResponseType = 'text'): Observable<ApiResponse<T>> {
        return this.handleError(this
            .getDefaultParameters()
            .switchMap((defaultParameters) => this.apiService
                .get<T>(key, Object.assign({}, parameters, defaultParameters), format, type)));
    }

    head<T = any>(key: string, parameters?: Parameters, format: ResponseFormat = 'json'): Observable<ApiResponse<T>> {
        return this.handleError(this
            .getDefaultParameters()
            .switchMap((defaultParameters) => this.apiService
                .head<T>(key, Object.assign({}, parameters, defaultParameters), format)));
    }

    post<T = any>(key: string, parameters?: Parameters, body?: any, format: ResponseFormat = 'json'): Observable<ApiResponse<T>> {
        return this.handleError(this
            .getDefaultParameters()
            .switchMap((defaultParameters) => this.apiService
                .post<T>(key, Object.assign({}, parameters, defaultParameters), body, format)));
    }

    buildUrl(key: string, parameters?: Parameters, format: ResponseFormat = 'json'): Observable<string> {
        return this
            .getDefaultParameters()
            .switchMap((defaultParameters) => this.apiService
                .buildUrl(key, Object.assign({}, parameters, defaultParameters), format))
            .first();
    }

    private getDefaultParameters(): Observable<Parameters> {
        return this.authenticationService
            .getAuthentication()
            .filter((auth) => auth != null)
            .map((auth) => ({
                // Thinking about the order of the parameters help while debugging later, because the resulting urls are
                // easier to read.
                user: auth.username,
                access_token: auth.accessToken,
            }))
            .first();
    }

    private handleError<T>(source: Observable<ApiResponse<T>>): Observable<ApiResponse> {
        return source
            .retryWhen((errors) => errors.switchMap((error) => {
                if (error.status === 401) {
                    logger.warn('Access token not valid, refreshing authentication');
                    return this.authenticationService.refreshLogin().map(() => error);
                }

                // It would also be possible to receive a 403, but that isn't a problem we can solve by refreshing the
                // access token.

                return Observable.throw(error);
            }));
    }
}

