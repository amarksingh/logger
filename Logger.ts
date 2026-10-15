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
    constructor($logger, $config) {
        this[kLogger] = $logger
    }

    /**
     * emergency method.
     *
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    emergency($message, $context = []) {
        this.writeLog('emerg', $message, $context);
    }

    /**
     * alert method.
     *
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    alert($message, $context = []) {
        this.writeLog('alert', $message, $context);
    }

    /**
     * critical method.
     *
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    critical($message, $context = []) {
        this.writeLog('crit', $message, $context);
    }

    /**
     * error method.
     *
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    error($message, $context = []) {
        this.writeLog('error', $message, $context);
    }

    /**
     * warning method.
     *
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    warning($message, $context = []) {
        this.writeLog('warning', $message, $context);
    }

    /**
     * notice method.
     *
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    notice($message, $context = []) {
        this.writeLog('notice', $message, $context);
    }

    /**
     * info method.
     *
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    info($message, $context = []) {
        this.writeLog('info', $message, $context);
    }

    /**
     * debug method.
     *
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    debug($message, $context = []) {
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
    log($level, $message, $context = []) {
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
    write($level, $message, $context = []) {
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
    writeLog($level, $message, $context) {
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