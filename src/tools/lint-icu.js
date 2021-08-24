const fs = require('fs');
const yaml = require('js-yaml');
const parser = require('intl-messageformat-parser');
const DEFAULT_LOCALE = 'de';
const languages = {};

function loadFile(directory, filename) {
    var language = filename.match(/(\w+)\.icu\.yaml$/)[1];
    var input = null;

    console.log('Loading', language, filename);

    var data = fs.readFileSync(directory + filename, 'utf8');

    try {
        input = yaml.safeLoad(data);
    } catch (e) {
        console.error(language, 'Error while parsing yaml: ' + e);
        throw new Error(language + ' Error while parsing yaml: ' + e);
    }

    var compiled = parseI18n(input, null, language);
    languages[language] = input;

    console.log('Validated', language, filename);
}

function parseI18n(obj, key, language) {
    var out = {};

    for (var k in obj){
        if (obj.hasOwnProperty(k)) {
            var fullKey = key ? key + '.' + k : k;

            if (typeof obj[k] == 'string') {
                try {
                    out[k] = parser.parse(obj[k]);
                } catch(e) {
                    console.error(language, 'Error while parsing ICU messages (' + k + '): ' + e);
                    throw language + 'Error while parsing ICU messages (' + k + '): ' + e;
                }
            } else {
                out[k] = parseI18n(obj[k], fullKey, language);
            }
        }
    }

    return out;
}

function flattenLanguage(obj, key, out) {
    out = out ? out : {};

    for (var k in obj){
        if (obj.hasOwnProperty(k)) {
            var fullKey = key ? key + '.' + k : k;

            if (typeof obj[k] == 'string') {
                out[fullKey] = obj[k];
            } else {
                flattenLanguage(obj[k], fullKey, out);
            }
        }
    }

    return out;
}

function compareLanguages(baseLanguage, otherLanguage, markLeftover) {
    console.log(markLeftover
        ? 'Searching for leftover keys'
        : 'Searching for missing keys in',
        baseLanguage, 'compared to', otherLanguage);

    var baseLang = flattenLanguage(languages[baseLanguage]);
    var otherLang = flattenLanguage(languages[otherLanguage]);
    var missingKeyCount = 0;

    Object.keys(baseLang).forEach((key) => {
        if (!otherLang[key]) {
            console.error(markLeftover
                ? 'Leftover key'
                : 'Missing key',
                key, 'in', otherLanguage, ':', baseLang[key]);
            ++missingKeyCount;
        }
    });

    if (missingKeyCount > 0) {
        console.error(missingKeyCount, markLeftover
            ? 'keys are missing'
            : 'are leftover keys, remove them (or they got renamed?)');
        return false;
    } else {
        console.info(markLeftover
            ? 'no leftover key'
            : 'no keys are missing');
        return true;
    }
}

fs.readdirSync('src/app/i18n/locales/').forEach(function(file) {
    loadFile('src/app/i18n/locales/', file);
});

var success = true;

Object.keys(languages).filter((x) => x != DEFAULT_LOCALE).forEach((language) => {
    console.log('');
    success = compareLanguages(DEFAULT_LOCALE, language) && success;
    success = compareLanguages(language, DEFAULT_LOCALE, true) && success;
});

if (!success) {
    console.log('Failed with at least one error');
    process.exit(1)
}
