import * as moment from 'moment';
import IntlMessageFormat from 'intl-messageformat';
import * as localStorage from 'local-storage';
import {Logger} from '../util/logger';

const logger = Logger.create('i18n');

/**
 * The default locale to use in case no language is specified.
 * @type {string}
 */
const DEFAULT_LOCALE = 'de';

/**
 * If true, missing translations are taken from the default locale.
 *
 * ONLY SET TO FALSE FOR DEBUGGING, NOT IN PRODUCTION!
 * @type {boolean}
 */
const FALLBACK_TO_DEFAULT_LOCALE = !(window as any).WEBPACK_DEBUG;

/**
 * Current locale used by the application.
 * @type {string}
 */
export const currentLocale: string = restoreLastLocale();

function restoreLastLocale(): string {
    const lastLocale = localStorage['currentLocale'] || DEFAULT_LOCALE;

    if (lastLocale === 'null' || lastLocale === 'undefined') {
        logger.warn('Locale im LocalStorage ist fehlerhaft, verwerfe den letzten Wert.');
        return DEFAULT_LOCALE;
    }

    return lastLocale;
}

/**
 * Set the current locale of the application. If the previous locale is different from the current one, the application
 * is automatically reloading itself.
 * @param locale The locale to use, e.g. 'de' or 'en'
 */
export function useLocale(locale: string): void {
    if (currentLocale !== locale) {
        logger.info('Selected locale is', locale, 'but previous locale was', currentLocale, 'a reload is performed!');
        localStorage['currentLocale'] = locale;
        document.location.reload();
    } else {
        logger.info('Selected locale is', locale);
    }
}

interface LocaleBundle {
    [key: string]: string|IntlMessageFormat;
}

const messageBundles = new Map<string, LocaleBundle>();
const missingCache = new Map<string, IntlMessageFormat>();

export function registerMessageBundle(locale: string, messages: LocaleBundle): void {
    messageBundles.set(locale, messages);
}

/**
 * Looks up a key from the *.icu.yaml file of the current locale and returns the formatted string.
 * @param key Key to look up, where nested objects are separated by dots.
 * @param parameters Optional parameters to apply while formatting.
 * @return {string} Formatted string
 */
export function i18n(key: string, parameters: {[key: string]: any} = null): string {
    let messageFormat = resolveMessageFormat(currentLocale, key);

    // Message format not found? Try to resolve with a default locale
    if (FALLBACK_TO_DEFAULT_LOCALE && messageFormat == null) {
        messageFormat = resolveMessageFormat(DEFAULT_LOCALE, key);
    }

    // We often have the case that we have an optional 'form' parameter.
    // So we profil it here to avoid an exception when omitting it:
    if (parameters) {
        parameters.form = parameters.form || null;
    } else {
        parameters = {form: null};
    }

    // Format locale if available, otherwise show only the key
    return messageFormat ? messageFormat.format(parameters) : `!! ${key} !!`;
}

/**
 * Displays a i18n message, but not with a key but the actual message format string. This is design as a temporary
 * solution till a string is translated to different locales and moved to the locale file.
 *
 * Take care not to generate to many unique message objects as they are cached.
 * @param messageFormat The icu message to parse and display.
 * @param parameters Optional parameters to apply while formatting.
 * @return {string} Formatted string
 */
export function missingI18n(messageFormat: string, parameters: {[key: string]: any} = null): string {
    let message = missingCache.get(messageFormat);

    if (!message) {
        // Not yet cached, parse the message
        // TODO: Maybe a size limited cache would be safer?
        try {
            message = new IntlMessageFormat(messageFormat, currentLocale);
            missingCache.set(messageFormat, message);
        } catch (e) {
            console.error('Error while parsing ICU messages (' + messageFormat + '): ' + e);
            throw new Error('Error while parsing ICU messages (' + messageFormat + '): ' + e);
        }
    }

    return message.format(parameters);
}

function resolveMessageFormat(locale: string, key: string): IntlMessageFormat {
    if (messageBundles.size === 0) {
        throw new Error('Can\'t provide translation, i18n system not initialized yet!');
    }

    // Resolve obj and key name (used for nested names like 'category.subcategory.name')
    const obj = messageBundles.get(locale);

    // Cache IntlMessageFormat if necessary
    let messageFormat = obj[key];

    // No translation key found?
    if (!messageFormat) {
        return null;
    }

    if (!(messageFormat instanceof IntlMessageFormat)) {
        messageFormat = new IntlMessageFormat(messageFormat, locale);
        obj[key] = messageFormat;
    }

    return messageFormat as IntlMessageFormat;
}

/**
 * Initialize the i18n system and especially external libraries that have their own locale configuration.
 */
export function initializeI18n(): void {
    // Initialize moment.js
    moment.locale(currentLocale);

    // Initialize datetimepicker, but this is mostly overridden on use
    // $.datetimepicker.setLocale(currentLocale);
}
