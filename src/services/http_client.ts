import {provideSingleton} from './inversify.config';
import {Observable} from 'rxjs';
import {Logger, LogLevel} from '../util/logger';

const logger = Logger.create('HttpClient', LogLevel.Info);

/**
 * Defines a Http response.
 */
export class HttpResponse {
    /**
     * True, if the status is a 2xx or 3xx status code
     */
    readonly ok: boolean;
    /**
     * The verb or method of the call.
     */
    readonly method: string;
    /**
     * The request url (currently without taking redirects into account).
     */
    readonly url: string;
    /**
     * The status code of the http response.
     */
    readonly status: number;
    /**
     * The textual representation of the status code.
     */
    readonly statusText: string;
    /**
     * Represents a map of response headers. A header is either a string or a list of strings.
     */
    readonly headers: Map<string, string|ReadonlyArray<string>>;

    /**
     * Parses the response body as JSON.
     */
    json(): any {
        return JSON.parse(this.xhr.responseText);
    }

    /**
     * Returns the response body as text.
     */
    text(): string {
        return this.xhr.responseText;
    }

    /**
     * Returns the response body as type specified by responseType
     */
    data(): any {
        return this.xhr.response;
    }

    constructor(private xhr: XMLHttpRequest, url: string, method: string) {
        this.status = this.xhr.status;
        this.statusText = this.xhr.statusText;
        this.ok = this.xhr.status >= 200 && this.xhr.status < 400;
        this.method = method;
        this.url = url;
        this.headers = parseHeaders(xhr.getAllResponseHeaders());
    }
}

/**
 * Defines additional options for a Http request.
 */
export interface RequestOptions {
    /**
     * The method of the request, default is 'GET'.
     */
    method?: string;
    /**
     * The request body to transmit.
     */
    body?: any;
    /**
     *  The type of the returned Object
     */
    responseType?: XMLHttpRequestResponseType;
}

/**
 * Defines a simple client for http requests.
 */
@provideSingleton(HttpClient)
export class HttpClient {
    private constructor() {}

    /**
     * Performs a http request.
     * @param url The url to request.
     * @param options Additional options.
     * @return {Observable<HttpResponse>} An observable emitting exactly one event in case the request was successful.
     */
    request(url: string, options?: RequestOptions): Observable<HttpResponse> {
        return new Observable<HttpResponse>((observer) => {
            // We use XHR instead of fetch internally, as fetch doesn't support canceling requests...
            const xhr = new XMLHttpRequest();
            const method       = (options && options.method)        || 'GET';
            let done = false;
            xhr.open(method, url);

            if (options && options.responseType) {
                xhr.responseType = options.responseType;
            }

            xhr.addEventListener('load', () => {
                const response = new HttpResponse(xhr, url, method);
                done = true;
                logger.log('Response', method, url, response.status, response.statusText);

                if (response.ok) {
                    observer.next(response);
                    observer.complete();
                } else {
                    observer.error(response);
                }
            });
            xhr.addEventListener('error', (event) => {
                const response = new HttpResponse(xhr, url, method);
                done = true;
                logger.error('Response', method, url, response.status, response.statusText, xhr);
                observer.error(response);
            });
            logger.log('Request', method, url);
            xhr.send(options.body);

            return () => {
                if (!done) {
                    logger.log('Canceling', method, url);
                    xhr.abort();
                }
            }
        });
    }

    /**
     * Performs a GET request of url.
     * @param url The url to request.
     * @param options Additional options.
     * @return {Observable<HttpResponse>} An observable emitting exactly one event in case the request was successful.
     */
    get(url: string, options?: RequestOptions, type?: XMLHttpRequestResponseType): Observable<HttpResponse> {
        return this.request(url, {
            method: 'GET',
            responseType: type,
            body: options && options.body,
        });
    }

    /**
     * Performs a POST request of url.
     * @param url The url to request.
     * @param body The request body to transmit.
     * @param options Additional options.
     * @return {Observable<HttpResponse>} An observable emitting exactly one event in case the request was successful.
     */
    post(url: string, body: any, options?: RequestOptions): Observable<HttpResponse> {
        return this.request(url, {
            method: 'POST',
            body: body,
        })
    }

    /**
     * Performs a HEAD request of url.
     * @param url The url to request.
     * @param options Additional options.
     * @return {Observable<HttpResponse>} An observable emitting exactly one event in case the request was successful.
     */
    head(url: string, options?: RequestOptions): Observable<HttpResponse> {
        return this.request(url, {
            method: 'HEAD',
            body: options && options.body,
        });
    }
}

function parseHeaders(headers: string): Map<string, string|ReadonlyArray<string>> {
    const result = new Map<string, string|Array<string>>();

    headers.trim().split('\n').forEach((row) => {
        const index = row.indexOf(':');
        const key = row.slice(0, index).trim().toLowerCase();
        const value = row.slice(index + 1).trim();

        if (!result.has(key)) {
            result.set(key, value);
        } else if (Array.isArray(result.get(key))) {
            (result.get(key) as Array<string>).push(value);
        } else {
            result.set(key, [result.get(key) as string, value]);
        }
    });

    return result;
}
