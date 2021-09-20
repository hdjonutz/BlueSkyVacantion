/**
 * Webpack loader for *.icu.yaml files. Parses the yaml files, the icu patterns and precompiles them.
 */

const yaml = require('js-yaml');
const fs   = require('fs');
const parser = require('intl-messageformat-parser');

module.exports = function(source) {
    var data = source;
    var language = this.request.match(/(\w+)\.icu\.yaml$/)[1];
    var input = null;

    try {
        input = yaml.load(data);
    } catch (e) {
        console.error('Error while parsing yaml: ' + e);
        throw new Error('Error while parsing yaml: ' + e);
    }

    var messages = {}

    function parseI18n(obj, key) {
        for (var k in obj){
            if (obj.hasOwnProperty(k)) {
                var fullKey = key ? key + '.' + k : k;

                if (typeof obj[k] == 'string') {
                    try {
                        // We don't use the parsed message, we just use the source string as it is much smaller.
                        // But we parse to check for format errors!
                        parser.parse(obj[k]);
                        messages[fullKey] = obj[k];
                    } catch(e) {
                        console.error('Error while parsing ICU messages (' + k + '): ' + e);
                        throw 'Error while parsing ICU messages (' + k + '): ' + e;
                    }
                } else {
                    parseI18n(obj[k], fullKey);
                }
            }
        }
    }

    parseI18n(input, null);

    var output = "var _i18n = require('../i18n.ts');\n\n" +
        "_i18n.registerMessageBundle('" + language + "', " +
        JSON.stringify(messages, null, '  ') +
        ");\n";

    return output;
};
