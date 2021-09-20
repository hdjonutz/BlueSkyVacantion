import {Observable} from 'rxjs/Observable';
import {provideSingleton} from './inversify.config';

export class LocalConfiguration {
    constructor(public readonly apiServerProtocol: string,
                public readonly apiServerHostname: string, public readonly apiServerPort: number,
                public readonly apiServerApiBase: string, public readonly enableEventPush: boolean,
                public readonly eventsServerViaProxy: boolean, public readonly eventsServerProtocol: string,
                public readonly eventsServerHost: string, public readonly eventsServerPort: number,
                public readonly eventsServerApiBase: string, public readonly appType: 'WEB'|'INFO',
                public readonly defaultUsername: string, public readonly defaultPassword: string) { }
}

@provideSingleton(LocalConfigurationService)
export class LocalConfigurationService {
    private constructor() {}

    get(): Observable<LocalConfiguration> {
        const configLocal = InLine.ConfigLocal;
        const currentProtocol = window.location.protocol.replace(/:$/, '');

        // Host und Port automatisch auf Basis der aktuellen origin bestimmen, falls diese nicht Konfiguriert sind.
        // Man kann fast immer (außer in der Entwicklung) davon ausgehen das wenn der Nutzer http://192.168.126:8080/ in
        // die Adresszeile eingibt, das die API dann unter http://192.168.126:8080/InLine3Api/api.php liegt.
        const apiServerProtocol = configLocal.protocol || (currentProtocol === 'file' ? 'http' : currentProtocol);
        const apiServerHost = configLocal.host || window.location.hostname;
        const apiServerPort = configLocal.Port || (window.location.port === ''
                ? (apiServerProtocol === 'https' ? 443 : 80)
                : window.location.port);
        const apiServerApiBase = (configLocal.ApiBase || '/InLine/api.php').replace(/\?$/, '');

        // Es gibt zwei mögliche Konfigurationen. Entweder ist der EventsServer eigenständig (was meistens der Fall ist)
        // und hat einen eigenen Port ist aber auf der selben Host. Oder der EventsServer wird über den Apache via Proxy
        // bereitgestellt, in dem Fall sind alle Parameter gleich, nur der Pfad anders.
        const enableEventPush = configLocal.enableEventPush !== false;
        const eventsServerViaProxy = configLocal.eventsServerViaProxy;
        const eventsServerProtocol = apiServerProtocol;
        const eventsServerHost = apiServerHost;
        const eventsServerPort = eventsServerViaProxy ? apiServerPort : 23061;
        const eventsServerApiBase = eventsServerViaProxy ? 'events/' : '';

        // Andere app typen unterstützen wir aktuell nicht, langfristig wird das wegfallen.
        const appType = configLocal.access_mode === 'mobile' ? 'INFO' : 'WEB';

        // Default Werte für den Login Bildschirm, bzw. für das Login während der Entwicklung:
        const defaultUsername = configLocal.defaultUsername;
        const defaultPassword = configLocal.defaultPassword;

        const localConfig = new LocalConfiguration(apiServerProtocol, apiServerHost,
            apiServerPort, apiServerApiBase, enableEventPush, eventsServerViaProxy, eventsServerProtocol,
            eventsServerHost, eventsServerPort, eventsServerApiBase, appType, defaultUsername, defaultPassword);

        return Observable.of(localConfig);
    }
}
