import 'reflect-metadata';
import {injectable} from "inversify";
import '../version';
import {Observable} from 'rxjs';

export class VersionInfo {
    /**
     * Creates a version info object.
     * @param version The version of the application.
     * @param build The build identifier (more or less the date of the build).
     * @param hash The Git hash of the build.
     * @param branch The Git branch of the build.
     */
    constructor(public readonly version: string, public readonly build: string, public readonly hash: string,
                public readonly branch: string, public readonly appVersion?: string) { }
}

@injectable()
export class VersionService {
    private constructor() {
        // TODO: Later move the update checker and reload functionality here... but only if not mobile!
    }

    /**
     * Returns the current application version.
     * @return {any}
     */
    getCurrentVersion(): Observable<VersionInfo> {
        // Special code for InLineMobile.INFO as there is currently no better way to access the app version from
        // here. Maybe to be removed in the future.
        const appVersion = InLine && InLine.AppMobile && InLine.AppMobile.version
            ? InLine.AppMobile.version.version
            : null;

        const info = new VersionInfo(InLine.Version.id,
            InLine.Version.build,
            InLine.Version.hash,
            InLine.Version.branch,
            appVersion);
        return Observable.of<VersionInfo>(info);
    }
}
