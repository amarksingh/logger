const kLogger = Symbol('logger')
const kConfig = Symbol('config')
class Logger {
    /**
     * constructor method.
     *
     * @param {any} logger
     * @param {any} config
     * @returns {any}
     */
    constructor($logger: any, $config: Record<string, any>) {
        this[kLogger] = $logger
    }

    /**
     * emergency method.
     *
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    emergency($message: string, $context: any[] = []) {
        this.writeLog('emerg', $message, $context);
    }

    /**
     * alert method.
     *
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    alert($message: string, $context: any[] = []) {
        this.writeLog('alert', $message, $context);
    }

    /**
     * critical method.
     *
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    critical($message: string, $context: any[] = []) {
        this.writeLog('crit', $message, $context);
    }

    /**
     * error method.
     *
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    error($message: string, $context: any[] = []) {
        this.writeLog('error', $message, $context);
    }

    /**
     * warning method.
     *
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    warning($message: string, $context: any[] = []) {
        this.writeLog('warning', $message, $context);
    }

    /**
     * notice method.
     *
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    notice($message: string, $context: any[] = []) {
        this.writeLog('notice', $message, $context);
    }

    /**
     * info method.
     *
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    info($message: string, $context: any[] = []) {
        this.writeLog('info', $message, $context);
    }

    /**
     * debug method.
     *
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    debug($message: string, $context: any[] = []) {
        this.writeLog('debug', $message, $context);
    }

    /**
     * log method.
     *
     * @param {any} level
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    log($level: any, $message: string, $context: any[] = []) {
        this.writeLog('log', $message, $context);
    }

    /**
     * write method.
     *
     * @param {any} level
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    write($level: any, $message: string, $context: any[] = []) {
        this.writeLog('write', $message, $context);
    }

    /**
     * writeLog method.
     *
     * @param {any} level
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    writeLog($level: any, $message: string, $context: any) {
        this[kLogger].log($level, $message, $context);
    }

    /**
     * getLogger method.
     *
     * @returns {any}
     */
    getLogger() {
        return this[kLogger];
    }

}

module.exports = Logger