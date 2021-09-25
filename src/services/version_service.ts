import 'reflect-metadata';
import {injectable} from "inversify";
import '../version';
import {Observable} from 'rxjs';
import ApplicationVersion from '../version';

export class VersionInfo {
    /**
     * Creates a version info object.
     * @param version The version of the application.
     * @param build The build identifier (more or less the date of the build).
     * @param hash The Git hash of the build.
     * @param branch The Git branch of the build.
     */
    constructor(public readonly version: string,
                public readonly build: string,
                public readonly hash: string,
                public readonly branch: string
                ) { }
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
        const version = ApplicationVersion();
        const info = new VersionInfo(
            version.id,
            version.build,
            version.hash,
            version.branch);
        return Observable.of<VersionInfo>(info);
    }
}
