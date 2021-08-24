/**
 * This file statically includes all available locales and translations. This means that every local and translation is
 * always included in the source files.
 *
 * If you need a new locale, add it here! You also have to modify webpack.config.shared.js to include the right locales
 * for external libraries.
 */

// Intl locals
import 'intl';
import 'intl/locale-data/jsonp/en.js';
import 'intl/locale-data/jsonp/de.js';
import 'intl/locale-data/jsonp/pl.js';

// Moment.js locals
import 'moment';
import 'moment/locale/de.js';
import 'moment/locale/pl.js';

// Message Bundles
import './locales/de.icu.yaml';
import './locales/en.icu.yaml';
import './locales/pl.icu.yaml';

import {initializeI18n} from './i18n';
initializeI18n();
