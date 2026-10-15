const { createLogger, transports, format } = require('winston')
const kLogger = Symbol('logger')
class Winston {
    /**
     * constructor method.
     *
     * @param {any} config
     * @param {any} handlers
     * @returns {any}
     */
    constructor(config: Record<string, any>, handlers: any) {
        this[kLogger] = this.createLogger(handlers)
    }

    /**
     * log method.
     *
     * @param {any} level
     * @param {any} message
     * @param {any} context
     * @returns {any}
     */
    log(level: any, message: string, context: any) {
        this[kLogger].log(level, message, context);
    }
    /**
     * createLogger method.
     *
     * @param {any} handlers
     * @returns {any}
     */
    createLogger(handlers: any) {
        return createLogger({
            levels: {
                emerg: 0,
                alert: 1,
                crit: 2,
                error: 3,
                warning: 4,
                notice: 5,
                info: 6,
                debug: 7,
                warn: 8,
                http: 9,
                verbose: 10,
                silly: 11
            },
            transports: handlers
        })
    }
    /**
     * getHandler method.
     *
     * @returns {any}
     */
    getHandler() {
        return this[kLogger]
    }

}
module.exports = {
    Winston,
    transports,
    format
}