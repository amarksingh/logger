const { format: { combine, splat, simple, timestamp, json, label, printf, prettyPrint, colorize } } = require('winston')

class Formatter {
    /**
     * constructor method.
     *
     * @param {any} config
     * @returns {any}
     */
    constructor(config = {}) {
        return this.combine(config)
    }
    /**
     * messageFormat method.
     *
     * @returns {any}
     */
    messageFormat() {
        return printf(({ level, message, timestamp }) => {
            if (message instanceof Error) {
                message = message.stack
            } else if (typeof message == 'object') {
                message = JSON.stringify(message, undefined, 2)
            }
            return `[${timestamp}] [${level}] : ${message}\n`
        })
    }
    /**
     * combine method.
     *
     * @returns {any}
     */
    combine() {
        return combine(
            timestamp(),
            prettyPrint(),
            this.messageFormat(),
        )
    }
}
module.exports = Formatter