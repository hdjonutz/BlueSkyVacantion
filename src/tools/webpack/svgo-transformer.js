const SVGO = require('svgo');

module.exports = function(content, path) {
    console.log('svgo: ',  content, path);
    return new Promise((resolve, reject) => {
        const svgo = new SVGO({
            plugins: [
                {"cleanupIDs": false}
            ]
        });

        svgo.optimize(content.toString(), (result) => {
            if (result.error) {
                reject(result.error);
            } else {
                resolve(result.data);
            }
        });
    });
};
