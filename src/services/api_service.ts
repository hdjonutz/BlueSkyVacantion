import 'reflect-metadata';
import * as url from 'url';
import ExtendableError from 'extendable-error-class';
import { resolve } from 'inversify-react';
import {HttpClient, HttpResponse} from './http_client';
import {Logger, LogLevel} from '../util/logger';
import {Observable, ReplaySubject} from 'rxjs';
import {shortenText} from '../util/string_helper';
import {VersionService} from './version_service';
import {LocalConfigurationService} from './local_configuration_service';
import {i18n} from '../i18n/i18n';
import {ApiServiceState, ApiServiceStatus} from './api_service_status';
import {showApiErrorDialog} from '../components/common/api-error-dialog';
import {SnackbarService, SnackbarStyle} from './snackbar_service';
import {inject, injectable} from "inversify";

const logger = Logger.create('ApiService', LogLevel.Info);

export type ResponseFormat = 'json' | 'text' | 'csv' | 'mime';

export interface Parameters {
    [param: string]: any
}

export class ApiResponse<T = any> {
    static ok<T = any>(data: T): ApiResponse<T> {
        return new ApiResponse<T>(200, 'OK', new Map<string, string|ReadonlyArray<string>>(), data);
    }

    static notFound<T = any>(): ApiResponse<T> {
        return new ApiResponse<T>(404, 'NOT FOUND', new Map<string, string|ReadonlyArray<string>>());
    }

    constructor(public readonly status: number, public readonly statusText: string,
                public readonly headers: Map<string, string|ReadonlyArray<string>>, public readonly data: T = null) {}
}

export class ApiError extends ExtendableError {
    constructor(message: string, public readonly response: HttpResponse) {
        super(message);

        // Workaround: Set the prototype explicitly.
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

// @injectable()
// export class ApiService {

//     private localConfigurationService: LocalConfigurationService;

//     private constructor(@inject('LocalConfigurationService') localConfigurationService: LocalConfigurationService) {
//         this.localConfigurationService = localConfigurationService;
//         this.localConfigurationService.get().subscribe((result) => {
//             console.log(result);
//             debugger;
//         });
//     };

//     post<T = any>(key: string, parameters?: Parameters, body?: any, format: ResponseFormat = 'json'): Observable<ApiResponse<T>> {
//         const payload = body && typeof body !== 'string' && !(body instanceof FormData)
//             ? JSON.stringify(normalizeJson(body))
//             : body;

//         return this
//             .buildUrl(key, parameters, format)
//             .first()
//             .switchMap((path) => this.httpClient.post(path, payload))
//             .map((r) => this.handleResponse<T>(r, key, format, body))
//             .do(null, (error) => this.handleError(error, body));
//     }
// }

@injectable()
export class ApiService {
    private statusSubject: ReplaySubject<ApiServiceStatus> = new ReplaySubject<ApiServiceStatus>(1);
    private lastSuccess: Date = null;
    
    private constructor(
        @inject('LocalConfigurationService')    private localConfigurationService: LocalConfigurationService,
        @inject('VersionService')               private versionService: VersionService,
        @inject('SnackbarService')              private snackbarService: SnackbarService,
        @inject('HttpClient')                   private httpClient: HttpClient
    ) {
        
        this.localConfigurationService.get()
            .first()
            .subscribe(() => {
                this.statusSubject
                // We don't need to show a message for successful communication and as we retry, we can also skip missing
                // sessions
                    .filter((s) => s.state !== ApiServiceState.Ok && s.state !== ApiServiceState.Unauthorized)
                    // .throttleTime(15000)
                    .subscribe((s) => {
                        const message = ApiServiceState.formatMessage(s.state);

                        this.snackbarService.displaySnack(message, null, {
                            title: i18n('aktionen.details'),
                            callback: () => showApiErrorDialog(s)
                        }, SnackbarStyle.Error);
                    });
            });

        this.statusSubject
            .distinctUntilChanged((a, b) => a.state === b.state)
            .subscribe((s) => logger.info('Api Status', ApiServiceState[s.state], s));
    }

    get<T = any>(key: string, parameters?: Parameters, format: ResponseFormat = 'json',
                 type: XMLHttpRequestResponseType = 'text'): Observable<ApiResponse<T>> {
        return this
            .buildUrl(key, parameters, format)
            .first()
            .switchMap((path) => this.httpClient.get(path, null, type))
            .map((r) => this.handleResponse<T>(r, key, format, null, type))
            .do(null, (error) => this.handleError(error));
    }

    getNoTokens<T = any>(path: string, fileName?: string): Observable<ApiResponse<T>> {
        return this
            .buildUrlnoTokens(path, fileName)
            .first()
            .switchMap((_path) => this.httpClient.get(_path))
            .map((r) => this.handleResponse<T>(r, '', 'text'))
            .do(null, (error) => this.handleError(error));
    }

    head<T = any>(key: string, parameters?: Parameters, format: ResponseFormat = 'json'): Observable<ApiResponse<T>> {
        return this
            .buildUrl(key, parameters, format)
            .first()
            .switchMap((path) => this.httpClient.head(path))
            .map((r) => this.handleResponse<T>(r, key, format))
            .do(null, (error) => this.handleError(error));
    }

    post<T = any>(key: string, parameters?: Parameters, body?: any, format: ResponseFormat = 'json'): Observable<ApiResponse<T>> {
        const payload = body && typeof body !== 'string' && !(body instanceof FormData)
            ? JSON.stringify(normalizeJson(body))
            : body;

        return this
            .buildUrl(key, parameters, format)
            .first()
            .switchMap((path) => this.httpClient.post(path, payload))
            .map((r) => this.handleResponse<T>(r, key, format, body))
            .do(null, (error) => this.handleError(error, body));
    }

    buildUrl(key: string, parameters?: Parameters, format: ResponseFormat = 'json'): Observable<string> {
        return Observable
            .combineLatest(
                this.localConfigurationService.get().filter((c) => c != null),
                this.versionService.getCurrentVersion()
            )
            .map(([localConfig, versionInfo]) => {
                // First only add the key name and mandant to the query object, because getting the parameter order
                // right helps while debugging. But we have add the other global level parameters too, so that
                // everything that is added on the higher layers comes last (like the access token)

                const query: Parameters = {
                    key: key,
                    // This is the case that we don't have a authorized call, these calls never have a mndNr
                    // so we should pass '0' here. Login is a special case, but callers can override the mnd.
                    format: format,
                    app: localConfig.appType,
                    version: versionInfo.version,
                };

                if (versionInfo.appVersion) {
                    query.app_version = versionInfo.appVersion;
                }

                for (const p in parameters) {
                    if (parameters.hasOwnProperty(p) && parameters[p] !== undefined) {
                        query[p] = parameters[p];
                    }
                }

                const urlObj = {
                    protocol: localConfig.apiServerProtocol,
                    hostname: localConfig.apiServerHostname,
                    port: '' + localConfig.apiServerPort,
                    pathname: localConfig.apiServerApiBase,
                    query: query,
                };

                return url.format(urlObj);
            })
            .first();
    }

    buildUrlnoTokens(path: string, fileName?: string): Observable<string> {
        return Observable
            .combineLatest(this.localConfigurationService.get().filter((c) => c != null),
                this.versionService.getCurrentVersion())
            .map(([localConfig, versionInfo]) => {
                const query: Parameters = {
                    app: localConfig.appType,
                    version: versionInfo.version,
                };

                if (versionInfo.appVersion) {
                    query.app_version = versionInfo.appVersion;
                }

                const urlObj = {
                    protocol: localConfig.apiServerProtocol,
                    hostname: localConfig.apiServerHostname,    // 'localhost'
                    port: '' + localConfig.apiServerPort,
                    pathname: fileName ? `${path}/${fileName}` : path
                };
                return url.format(urlObj);
            })
            .first();
    }

    getStatus(): Observable<ApiServiceStatus> {
        return this.statusSubject;
    }

    private handleResponse<T = any>(response: HttpResponse, key: string, format: ResponseFormat, body?: any,
                                    type: XMLHttpRequestResponseType = 'text') {
        let data = null;

        try {
            if (response.method !== 'HEAD') {
                // For HEAD responses we always have data null, as a HEAD response has only headers!
                data = format === 'json' ? response.json() : type === 'text' ? response.text() : response.data();
            }
        } catch (error) {
            logger.error('Error while parsing response to json', response.method, response.url, format);
            throw response;
        }

        if (body) {
            logger.log(response.method, response.url, format === 'json' ? data : shortenText(data, 1000));
        } else {
            logger.log(response.method, response.url, typeof body === 'string' ? shortenText(body, 1000) : body, data);
        }

        this.lastSuccess = new Date();
        this.statusSubject.next(new ApiServiceStatus(ApiServiceState.byStatusCode(response.status), this.lastSuccess,
            response.method, response.url, `${response.status} ${response.statusText}`));

        // Some Api calls return a wrapped call response and other just return the call response for json responses. We
        // just don't care and try to unpack it, if it won't work, it was not wrapped.
        const unpackedData = data == null
            ? data
            : (typeof data[key] !== 'undefined' ? data[key] : data) as T;

        // If keys not equal throw error
        if (unpackedData != null) {
            const keys = Object.keys(data);
            if (!Array.isArray(data) && typeof data === 'object' && keys.length === 1 && keys[0] !== key) {
                logger.error('Wrong Response Key: Expected ' + key + ' --> Received: ' + keys[0]);
                // throw new Error('Wrong Response Key: Expected ' + key + ' --> Received: ' + keys[0]);
            }
        }

        return new ApiResponse<T>(
            response.status,
            response.statusText,
            response.headers,
            unpackedData
        );
    }

    private handleError(error: HttpResponse, body?: any) {
        const log = error.status === 0 || error.status >= 500 ? logger.error : logger.warn;
        let data = null

        if (error.method !== 'HEAD') {
            // For HEAD responses we always have data null, as a HEAD response has only headers!
            data = error.text();
        }

        if (body != null) {
            log(error.method, error.url, typeof body === 'string' ? shortenText(body, 1000) : body, data, error);
        } else {
            log(error.method, error.url, data, error);
        }

        const responseMessage = data
            ? `${error.status} ${error.statusText}\n\n${data}`
            : `${error.status} ${error.statusText}`;
        const status = new ApiServiceStatus(ApiServiceState.byStatusCode(error.status), this.lastSuccess, error.method,
            error.url, responseMessage);
        this.statusSubject.next(status);
    }
}

/**
 * Convert Json to the legacy post payload recognized by InLine.
 */
export function encodePostBody(json: any): string {
    return Object
        .keys(json)
        .filter((k) => json[k] != null && json[k] !== undefined)
        .map((k) => `${k} = ${json[k]}\r\n`)
        .join('');
}

/**
 * Converts Json by removing null values and converting Date Objects to Unix Timestamps.
 * @param json
 * @return {any}
 */
export function normalizeJson(json: any): any {
    if (Array.isArray(json)) {
        return json.map((j) => normalizeJson(normalizeJsonValue(j)));
    } else if (json != null && typeof json === 'object') {
        const o: any = {};
        Object.keys(json).forEach((k) => o[k] = normalizeJson(normalizeJsonValue(json[k])));
        return o;
    } else {
        return json;
    }
}

function normalizeJsonValue(json: any): any {
    if (json == null) {
        return undefined;
    } else if (json instanceof Date) {
        return +json;
    } else {
        return json;
    }
}
