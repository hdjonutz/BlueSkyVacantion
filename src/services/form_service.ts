import {connectable, interval, merge, Observable, of, ReplaySubject, Subscription} from 'rxjs';
import {Logger, LogLevel} from '../util/logger';
import {inject, injectable} from 'inversify';
import {connect, map, mergeAll, publish, publishReplay, share, shareReplay, tap} from 'rxjs/operators';
import {ApiService} from './api_service';
import {AuthorizedApiService} from './authorized_api_service';
import { i18n } from '../i18n/i18n';
import {Publish} from '@mui/icons-material';

const logger = Logger.create('ContainerClient', LogLevel.Info);

export class Options {
    static parse(json: any): Options {
        let opts = json['OPTS'] && json['OPTS'].length > 0
            ? json['OPTS'].map((j: any) => {
                return {
                    value: j['VALUE'],
                    text: j['TITEL_I18N'] ? i18n(j['TITEL_I18N']) : j['TITEL'],
                }
            })
            : null;

        opts = json['OPTS'] && json['OPTS'].FORMID
            ? { FORMID: json['OPTS'].FORMID,
                IDENTIFIER: json['OPTS'].IDENTIFIER,
                INPUT: json['OPTS'].INPUT }
            : opts;

        return new Options(
            opts,
            json['KEY'],
            json['NAME'],
            json['REQUIRED'] || 'NO',
            json['ALLOW_TEXT_INPUT_MANUAL'] === 1,
        );
    }
    constructor(public readonly OPTS: Array<{[key: string]: string} | {[key: string]: string}>,
                public readonly KEY: string,
                public readonly NAME: string,
                public readonly REQUIRED: string,
                public readonly ALLOW_TEXT_INPUT_MANUAL: boolean,
    ) { }
}


export class FormConfig {
    static parse(formId: string, json: any): FormConfig {
        const opts = json['ATTS']
            ? json['ATTS'].map((p: any) => Options.parse(p))
            : null;
        return new FormConfig(formId,
            json['TITEL_ANZEIGE'],
            json['TITEL_ANZEIGE_I18N'],
            opts);
    }

    constructor(public readonly formId: string,
                public readonly titleAnzeige: string,
                public readonly titleAnzeigeI18n: string,
                public readonly ATTS: Array<Options>) { }
}

class FormConfigs {
    formConfigsByFormId: Map<string, FormConfig> = new Map<string, FormConfig>();

    constructor(public readonly formConfigs: ReadonlyArray<FormConfig>) {
        this.formConfigs.forEach((f) => this.formConfigsByFormId.set(f.formId, f));
    }
}

@injectable()
export class FormsService {
    private fromIdBuffer = {};
    private formConfigs: Observable<FormConfigs>;

    public constructor(@inject('ApiService') private apiService: ApiService,
                       @inject('AuthorizedApiService') private authorizedApiService: AuthorizedApiService,
    ) {}

    loadAllFormConfigs(): Observable<FormConfigs> {
        if (!this.formConfigs) {
            const observable = this.apiService.get('getFormConfig')
                .pipe(
                    map((r) => {
                        const formConfigs = Object.keys(r.data).map((formId) => {
                            return FormConfig.parse(formId, r.data[formId]);
                        });
                        return new FormConfigs(formConfigs);
                    }),
                    shareReplay(1)
                );
            connectable(observable, { connector: () => new ReplaySubject(1), resetOnDisconnect: false });
            this.formConfigs = observable;
        }
        return this.formConfigs;
    }

    getAllFormConfigs(): Observable<ReadonlyArray<FormConfig>> {
        return this.loadAllFormConfigs()
            .pipe(map((f) => f.formConfigs));
    }

    getFormConfigByFormId(formId: string): Observable<FormConfig> {
        return this.loadAllFormConfigs()
            .pipe(map((f) => f.formConfigsByFormId.get(formId) as FormConfig));
    }

    getFormId(formId: string): Observable<any> {
        if (this.fromIdBuffer[formId]) {
            return of(this.fromIdBuffer[formId]);
        }
        const observable = this.apiService.get('getFormData', {formid: formId})
            .pipe(
                map((res) => {
                    const data = res.data || [];
                    if (data.length > 0) {
                        this.fromIdBuffer[formId] = data;
                    }
                    return data;
                })
            );
        return observable;
    }
}
