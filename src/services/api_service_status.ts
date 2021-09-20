import {i18n} from '../i18n/i18n';

export enum ApiServiceState {
    /**
     * The Api is successfully responding to requests.
     */
    Ok,
    /**
     * The Api is not reachable because of a communication error (can still be things like network, offline, ip not
     * reachable, CORS, SSL, ...).
     */
    CommunicationError,
    /**
     * The server returned a 5XX error code on the last request.
     */
    ServerError,
    /**
     * The Apache is responding with a Bad Gateway error, because the Api can't reach the InLine Server.
     */
    ServerOffline,
    /**
     * The Api expected a valid access token, but no token, an invalid token or an expired token was permitted.
     * Make sure a token was provided and also that the token is for this server, mandant and not expired!
     */
    Unauthorized,
    /**
     * The Api expected additional permissions, however the provided access token doesn't have the permissions.
     * This can mean that the call expected the "int" flag to be true, or that the user has the correct permission. But
     * this means that the access token was at least valid and not expired!
     */
    InsufficientPermission,
}

export module ApiServiceState {
    export function byStatusCode(status: number|string): ApiServiceState {
        if (status === 0 || status === '') {
            return ApiServiceState.CommunicationError;
        } else if (status === 502 || status === 504) {
            return ApiServiceState.ServerOffline;
        } else if (status >= 500) {
            return ApiServiceState.ServerError;
        } else if (status === 401) {
            return ApiServiceState.Unauthorized;
        } else if (status === 403) {
            return ApiServiceState.InsufficientPermission;
        } else {
            return ApiServiceState.Ok;
        }
    }

    export function formatMessage(state: ApiServiceState): string {
        switch (state) {
            case ApiServiceState.ServerError:
                return i18n('kommunikations_fehler.interner_serverfehler');
            case ApiServiceState.ServerOffline:
                return i18n('kommunikations_fehler.server_offline');
            case ApiServiceState.CommunicationError:
                return i18n('kommunikations_fehler.fehler_serverkommunikation');
            case ApiServiceState.Unauthorized:
                return i18n('kommunikations_fehler.keine_anmeldung');
            case ApiServiceState.InsufficientPermission:
                return i18n('kommunikations_fehler.keine_berechtigung');
            case ApiServiceState.Ok:
            default:
                return i18n('kommunikations_fehler.kommunikation_erfolgreich');
        }
    }
}

export class ApiServiceStatus {
    constructor(public readonly state: ApiServiceState, public readonly lastSuccess: Date,
                public readonly lastMethod: string, public readonly lastUrl: string,
                public readonly responseMessage: string) { }
}
