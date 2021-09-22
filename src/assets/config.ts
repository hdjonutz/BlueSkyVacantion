interface LocalConfig {
    host: string;
    protocol: string;
    apiBase: string;
    port: number;
    eventsServerViaProxy: boolean;
    defaultUsername: string;
    defaultPassword: string;
    access_mode: string;
    splashImagesPath: string;
    enableEventPush: boolean;
    enablePasswordPolicy: boolean;
}
export function getLocalConfig(): LocalConfig {
    const configLocal = {
        host: '192.168.1.246',
        protocol: 'https',
        apiBase: '/InLine/api.php',
        port: 80,
        eventsServerViaProxy: true,
        defaultUsername: 'service',
        defaultPassword: 'injm314',
        access_mode: 'licensed',
        splashImagesPath: 'ABRM',
        enableEventPush: true,
        enablePasswordPolicy: false,
    };
    return configLocal;
}


