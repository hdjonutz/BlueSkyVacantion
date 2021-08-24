// TODO enable react to productive mode: process.env.NODE_ENV !== "production"
// TODO https://reactjs.org/docs/optimizing-performance.html
// TODO https://stackoverflow.com/questions/22118915/how-to-turn-on-off-reactjs-development-mode/22118993
// TODO https://webpack.js.org/guides/production/

export const environment: any = {
    // Flag to disable angular debug feature that aren't required during production
    production: false,
    // The locale used for the application (mainly for date output)
    locale: 'de-DE',
    // For building on the build server, there values are filled automatically. Otherwise they are not filled
    // The git branch the build was taken from (if available)
    gitBuildBranch: null,
    // The git commit the build was build from (if available)
    gitBuildCommit: null,
    // Only use local storage (allows to modify it during e2e tests)
    forceLocalStorage: false,
};
