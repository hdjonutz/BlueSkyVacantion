const version = {
    name: '{!NAME!}',
    id: '{!VERSION!}',
    build: '{!BUILD_DATE!}',
    hash: '{!GIT_COMMIT!}',
    branch: '{!GIT_BRANCH!}'
};

export default function ApplicationVersion() {
    return version;
}

export interface ApplicationInfo {
    name: string;
    id: string;
    build: string;
    hash: string;
    branch: string;
}
