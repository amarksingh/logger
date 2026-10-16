const kLogger: unique symbol = Symbol('logger');
const kConfig: unique symbol = Symbol('config');

class Logger {
    [kLogger]: any;
    [kConfig]?: unknown;

    /**
     * Create a new Logger instance.
     *
     * @param logger - Underlying logger instance.
     * @param config - Driver configuration or event dispatcher.
     */
    constructor(logger: any, config?: unknown) {
        this[kLogger] = logger;
    }

    /**
     * Log an emergency message to the logs.
     *
     * @param message - Log message.
     * @param context - Additional contextual data.
     */
    emergency(message: unknown, context: unknown = []): void {
        this.writeLog('emerg', message, context);
    }

    /**
     * Log an alert message to the logs.
     *
     * @param message - Log message.
     * @param context - Additional contextual data.
     */
    alert(message: unknown, context: unknown = []): void {
        this.writeLog('alert', message, context);
    }

    /**
     * Log a critical message to the logs.
     *
     * @param message - Log message.
     * @param context - Additional contextual data.
     */
    critical(message: unknown, context: unknown = []): void {
        this.writeLog('crit', message, context);
    }

    /**
     * Log an error message to the logs.
     *
     * @param message - Log message.
     * @param context - Additional contextual data.
     */
    error(message: unknown, context: unknown = []): void {
        this.writeLog('error', message, context);
    }

    /**
     * Log a warning message to the logs.
     *
     * @param message - Log message.
     * @param context - Additional contextual data.
     */
    warning(message: unknown, context: unknown = []): void {
        this.writeLog('warning', message, context);
    }

    /**
     * Log a notice to the logs.
     *
     * @param message - Log message.
     * @param context - Additional contextual data.
     */
    notice(message: unknown, context: unknown = []): void {
        this.writeLog('notice', message, context);
    }

    /**
     * Log an informational message to the logs.
     *
     * @param message - Log message.
     * @param context - Additional contextual data.
     */
    info(message: unknown, context: unknown = []): void {
        this.writeLog('info', message, context);
    }

    /**
     * Log a debug message to the logs.
     *
     * @param message - Log message.
     * @param context - Additional contextual data.
     */
    debug(message: unknown, context: unknown = []): void {
        this.writeLog('debug', message, context);
    }

    /**
     * Log a message with arbitrary level to the logs.
     *
     * @param level - Log level.
     * @param message - Log message.
     * @param context - Additional contextual data.
     */
    log(level: unknown, message: unknown, context: unknown = []): void {
        this.writeLog('log', message, context);
    }

    /**
     * Dynamically pass log calls.
     *
     * @param level - Log level.
     * @param message - Log message.
     * @param context - Additional contextual data.
     */
    write(level: unknown, message: unknown, context: unknown = []): void {
        this.writeLog('write', message, context);
    }

    /**
     * Write a log message to the underlying logger.
     *
     * @param level - Log level.
     * @param message - Log message.
     * @param context - Additional contextual data.
     */
    writeLog(level: unknown, message: unknown, context: unknown): void {
        this[kLogger].log(level, message, context);
    }

    /**
     * Retrieve the underlying logger instance.
     *
     * @returns The underlying logger.
     */
    getLogger(): any {
        return this[kLogger];
    }
}

export = Logger;