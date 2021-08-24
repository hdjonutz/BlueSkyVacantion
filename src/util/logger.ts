/**
 * 🌲 Simple logger that outputs a logger name (with color) before the log message.
 * Also allows to set different log levels.
 */
import * as bowser from 'bowser';
import ColorHash from 'color-hash';

const COLORS_ACTIVE = true;
const colorHash = new ColorHash({lightness: [0.35, 0.5, 0.65]});

export enum LogLevel {
    /**
     * No log output.
     */
    None = 0,
    /**
     * Only errors.
     */
    Error = 1,
    /**
     * Warning and errors.
     */
    Warning = 2,
    /**
     * Info, warning and errors.
     */
    Info = 3,
    /**
     * All log messages.
     */
    Log = 4,
}

export module LogLevel {
    export function parse(level: string|number) {
        switch (level) {
            case LogLevel.Log:
            case 'log':
            case 'Log':
                return LogLevel.Log;
            case LogLevel.Info:
            case 'info':
            case 'Info':
                return LogLevel.Info;
            case LogLevel.Warning:
            case 'warning':
            case 'Warning':
                return LogLevel.Warning;
            case LogLevel.Error:
            case 'error':
            case 'Error':
                return LogLevel.Error;
            case LogLevel.None:
            case 'none':
            case 'None':
            default:
                return LogLevel.None;
        }
    }
}

interface LoggerMap {
    [name: string]: Logger
}

/**
 * Logger that is prefixed with a namespace and allows to toggle the log level. Depending on the browser the namespace
 * has a distinguishable color. Has the same logging methods as the console object.
 */
export class Logger {
    private static _loggers: LoggerMap = {};

    private _level: LogLevel = LogLevel.Log;

    public log: Function;
    public info: Function;
    public warn: Function;
    public error: Function;

    /**
     * Returns a map containing all active loggers in the application
     * @return {Readonly<LoggerMap>}
     */
    static get loggers(): Readonly<LoggerMap> {
        return this._loggers;
    }

    /**
     * Set the log level of all existing loggers to level.
     * @param {LogLevel} level
     */
    static setGlobalLevel(level: LogLevel): void {
        Object
            .keys(this._loggers)
            .forEach((name) => this._loggers[name].level = level);
    }

    /**
     * Creates a new instance of a logger.
     * @param {string} name
     * @param {LogLevel} level
     * @return {Logger}
     */
    static create(name: string, level: LogLevel = LogLevel.Log): Logger {
        if (Logger._loggers[name] != null) {
            return this._loggers[name];
        } else {
            const logger = new Logger(name, level);
            Logger._loggers[name] = logger;
            return logger;
        }
    }

    get level(): LogLevel {
        return this._level;
    }
    set level(value: LogLevel) {
        // We parse the log level as a string here, to make debugging easier
        this._level = LogLevel.parse(value);
        this.initialize();
    }

    private constructor(public readonly name: string, level: LogLevel = LogLevel.Log) {
        this._level = level;
        this.initialize();
    }

    private initialize() {
        this.log = this.prefixCall(console.log, this._level >= LogLevel.Log);
        this.info = this.prefixCall(console.info, this._level >= LogLevel.Info);
        this.warn = this.prefixCall(console.warn, this._level >= LogLevel.Warning);
        this.error = this.prefixCall(console.error, this._level >= LogLevel.Error);
    }

    private prefixCall(call: Function, active: boolean = true) {
        // Calculate to text color based on the prefix
        const style = `font-weight: bold; color: ${colorHash.hex(this.name)};`;
        const useColors = COLORS_ACTIVE && !bowser.msie && !bowser.msedge && !isKarma();
        const format = useColors ? `%c${this.name}:` : `${this.name}:`;

        if (!active) {
            return () => {}; // NOP
        } else if (this.name == null) {
            return call;
        } else if (typeof call.bind === 'undefined') { // IE < 10
            return useColors
                ? Function.prototype.bind.call(call, console, format, style)
                : Function.prototype.bind.call(call, console, format);
        } else {
            return useColors
                ? call.bind(console, format, style)
                : call.bind(console, format);
        }
    }
}

/**
 * Detect if we are running inside the Karma test runner.
 * @return {boolean}
 */
function isKarma(): boolean {
    return typeof (window as any).__karma__ !== 'undefined';
}

// Also provide a global logger object. This allows to change the logging level during runtime via the DevTools.
// Just write: Logger.globalLevel = 'log'
(window as any)['Logger'] = Logger;
