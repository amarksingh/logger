require('@ostro/support/helpers')
const Manager = require('@ostro/support/manager')
const LineFormatter = require('./LineFormatter')
const Logger = require('./Logger')
const InvalidArgumentException = require('./InvalidArgumentException')
const { Winston, transports, format } = require('./winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs')
const path = require('path')
const { Console } = require('console');

class LogManager extends Manager {

    /**
     * $type property.
     * @type {any}
     */
    $type = 'logging';

    /**
     * stack method.
     *
     * @param {any} channels
     * @param {any} channel
     * @returns {any}
     */
    stack($channels, $channel = null) {
        return new Logger(
            this.createStackDriver({
                channels: $channels
            }),
        );
    }

    /**
     * channel method.
     *
     * @param {any} channel
     * @returns {any}
     */
    channel($channel = null) {
        return this.driver($channel);
    }

    /**
     * driver method.
     *
     * @param {any} driver
     * @returns {any}
     */
    driver($driver = null) {
        return this.get($driver || this.getDefaultDriver());
    }

    /**
     * get method.
     *
     * @param {any} name
     * @returns {any}
     */
    get($name) {
        return this.$drivers[$name] || (this.$drivers[$name] = new Logger(this.resolve($name), this.configurationFor($name)))
    }

    /**
     * createEmergencyLogger method.
     *
     * @returns {any}
     */
    createEmergencyLogger() {
        const storagePath = typeof this.$container.storagePath === 'function'
            ? this.$container.storagePath()
            : path.resolve('storage');
        return new Logger(
            new Winston('Ostro', this.prepareHandlers([
                this.prepareHandler(
                    new transports.File({
                        filename: path.join(storagePath, 'logs', 'Ostro.log'),
                        level: 'debug'
                    })
                )
            ])),
            this.$container['events']
        );
    }

    /**
     * resolve method.
     *
     * @param {any} name
     * @returns {any}
     */
    resolve($name) {
        let $config = this.configurationFor($name);
        if (!($config)) {
            throw new InvalidArgumentException("Log [" + $name + "] is not defined.");
        }
        return super.resolve($name, $config)
    }


    /**
     * createCustomDriver method.
     *
     * @param {any} config
     * @returns {any}
     */
    createCustomDriver($config) {
        let $via = $config['via']
        let $factory = is_callable($via) ? $via : this.$container.make($via);
        return $factory($config);
    }

    /**
     * createStackDriver method.
     *
     * @param {any} config
     * @returns {any}
     */
    createStackDriver($config) {
        let $handlers = collect($config['channels']).flatMap(($channel) => {
            let ch = this.channel($channel)
            return ch.getLogger().getHandler()
        }).all();
        if (!$config['ignore_exceptions']) {
            $handlers.handleExceptions = true;
        }
        return new Winston(($config), $handlers);
    }

    /**
     * createSyslogDriver method.
     *
     * @param {any} config
     * @returns {any}
     */
    createSyslogDriver($config) {
        const output = fs.createWriteStream(path.resolve('storage/logs/application.log'));
        const errorOutput = fs.createWriteStream(path.resolve('storage/logs/application.log'));
        return new Console({
            stdout: output,
            stderr: errorOutput
        });
    }

    /**
     * createSingleDriver method.
     *
     * @param {any} config
     * @returns {any}
     */
    createSingleDriver($config) {
        return new Winston(($config), [
            this.prepareHandler(
                new transports.File({
                    filename: $config['path'] || 'storage/logs/application.log'
                }), $config
            ),
        ]);
    }

    /**
     * createConsoleDriver method.
     *
     * @param {any} config
     * @returns {any}
     */
    createConsoleDriver($config) {
        return new Winston(($config), [
            this.prepareHandler(new transports.Console({ colorize: true, format: format.colorize() }), $config)
        ]);
    }

    /**
     * createDailyDriver method.
     *
     * @param {any} config
     * @returns {any}
     */
    createDailyDriver($config) {
        return new Winston(($config), [
            this.prepareHandler(new DailyRotateFile({
                filename: $config['path'] || 'storage/logs/application.log',
                datePattern: $config['date_pattern'] || 'YYYY-MM-DD',
                zippedArchive: false,
                level: $config['level'] || 'info',
                maxSize: $config['size'] || '10m',
                maxFiles: $config['14'] || '14d',
            }), $config),
        ]);
    }

    /**
     * prepareTransport method.
     *
     * @param {any} transport
     * @returns {any}
     */
    prepareTransport(transport) {
        return transport
    }

    /**
     * prepareHandlers method.
     *
     * @param {any} handlers
     * @returns {any}
     */
    prepareHandlers($handlers) {
        return $handlers;
    }

    /**
     * prepareHandler method.
     *
     * @param {any} handler
     * @param {any} config
     * @returns {any}
     */
    prepareHandler($handler, $config = {}) {
        if (!($config['formatter'])) {
            $handler.format = (this.formatter());
        } else if ($config['formatter'] !== 'default') {
            $handler.format = (this.$container.make($config['formatter'], $config['formatter_with'] || null));
        }

        return $handler;
    }

    /**
     * formatter method.
     *
     * @param {any} config
     * @returns {any}
     */
    formatter(config) {
        return new LineFormatter(config);
    }

    /**
     * configurationFor method.
     *
     * @param {any} name
     * @returns {any}
     */
    configurationFor(name) {
        return super.getConfig(`channels.${name}`);
    }

    /**
     * report method.
     *
     * @param {any} exception
     * @returns {any}
     */
    report($exception) {
        this.driver().error($exception)
    }
}

module.exports = LogManager