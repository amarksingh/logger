const ServiceProvider = require('@ostro/support/serviceProvider');
const LogManager = require('./LogManager');
class logServiceProvider extends ServiceProvider {
    /**
     * register method.
     *
     * @returns {any}
     */
    register() {
        this.$app.singleton('logger', function(app) {
            return new LogManager(app)
        })
    }

}
module.exports = logServiceProvider