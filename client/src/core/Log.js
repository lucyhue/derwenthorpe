/* eslint no-console: 0 */
import { localStorage } from './localStorage';
import { Enum } from './Enum';

export const LOG_LEVEL = new Enum(
	'DEBUG',
	'INFO',
	'WARN',
	'ERROR',
	'FATAL'
);

/**
 * Logging Utility.
 * Exposes 5 static methods, Log.debug, Log.info, Log.warn, Log.error and Log.fatal.
 */
export class Log {

	/**
     * Using a getter, mainly for testing so that it can be spied upon
     * @returns {LOG_LEVEL}     The level that should be logged to
     * @private
     */
	static storedLogLevel() {
		return localStorage.getItem('logLevel');
	}

	/**
     * Gets the categories that should be logged
     * @returns {String[]}       An array of the categories that should be logged below WARN level
     */
	static storedLogCategories() {
		return localStorage.getArray('logCategories');
	}

	/**
     * Gets the level that should be logged to, checking each source in turn
     * @returns {LOG_LEVEL}     The level that should be logged to
     * @private
     */
	static numericLogLevel() {

		let logLevel = LOG_LEVEL.indexOf(LOG_LEVEL.INFO);

		const storedLoglevel = Log.storedLogLevel();
		if (storedLoglevel !== undefined) {
			if (!LOG_LEVEL.contains(storedLoglevel)) {
				throw new Error(`The stored log level is invalid: ${storedLoglevel}`);
			}
			logLevel = LOG_LEVEL.indexOf(LOG_LEVEL[storedLoglevel]);
		}

		return logLevel;
	}

	/**
     * Determine if the given level should be logged or not
     * @param   {LOG_LEVEL} level    The level to check whether it should be logged
     * @returns {Boolean}            True if the level should be logged
     * @private
     */
	static shouldLogLevel(level) {
		return (level >= Log.numericLogLevel());
	}

	/**
     * Determine if the given category should be logged or not
     * @param  {String} category    The category needing to be logged
     * @returns {Boolean}            True if the category should be logged
     * @private
     */
	static shouldLogCategory(category) {
		const storedLogCategories = Log.storedLogCategories();

		// If we have no categories then log all by default
		if (storedLogCategories.length === 0) {
			return true;
		}

		return storedLogCategories.some((c) => c === category);
	}

	/**
     * Determine if a message should be logged
     * @param  {LOG_LEVEL} level    The level to check whether it should be logged
     * @param  {String} category    The category needing to be logged
     * @returns {Boolean}            True if the category should be logged
     * @private
     */
	static shouldLogMessage(level, category) {
		const shouldLogLevel = Log.shouldLogLevel(level);
		const shouldLogCategory = Log.shouldLogCategory(category);

		// Don't log if we should be ignoring this level
		if (shouldLogLevel === false) return false;

		// Don't log if we should be ignoring this category,
		// but only if it's below a certain level. We want all
		// warnings and errors to be logged regardless
		if (shouldLogCategory === false && level < LOG_LEVEL.INFO) return false;

		return true;
	}

	/**
     * Log Debug information to the log
     * @param  {String}         category The category needing to be logged
     * @param  {String|Error}   message  A message or an Error object to log
     * @param  {Object[]}       args     Any additional arguments that should be logged
     * @public
     */
	static debug(category, message, ...args) {
		if (Log.shouldLogMessage(LOG_LEVEL.DEBUG, category)) {
			console.log(new Date(), category, message, ...args);
		}
	}

	/**
     * Log general information to the log
     * @param  {String}         category The category needing to be logged
     * @param  {String|Error}   message  A message or an Error object to log
     * @param  {Object[]}       args     Any additional arguments that should be logged
     * @public
     */
	static info(category, message, ...args) {
		if (Log.shouldLogMessage(LOG_LEVEL.INFO, category)) {
			console.info(new Date(), category, message, ...args);
		}
	}

	/**
     * Log Warnings to the log
     * @param  {String}         category The category needing to be logged
     * @param  {String|Error}   message  A message or an Error object to log
     * @param  {Object[]}       args     Any additional arguments that should be logged
     * @public
     */
	static warn(category, message, ...args) {
		if (!message) console.warn(new Date(), 'Log.warn should always be called with a category and message');

		if (Log.shouldLogMessage(LOG_LEVEL.WARN, category)) {
			console.warn(new Date(), category, message, ...args);
		}
	}

	/**
     * Log errors to the log
     * @param  {String}         category The category needing to be logged
     * @param  {String|Error}   message  A message or an Error object to log
     * @param  {Object[]}       args     Any additional arguments that should be logged
     * @public
     */
	static error(category, message, ...args) {
		if (!message) console.warn(new Date(), 'Log.error should always be called with a category and message');

		if (Log.shouldLogMessage(LOG_LEVEL.ERROR, category)) {
			console.error(new Date(), category, message, ...args);

			if (message instanceof Error) {
				// convert actual errors to objects because JSNLog doesn't send the error object's prototype properties (name, message, stack)
				message = {
					...message,
					name: message.name,
					message: message.message,
					stack: message.stack,
				};
			}
		}
	}

	/**
     * Log catastrophic failures to the log
     * @param  {String}         category The category needing to be logged
     * @param  {String|Error}   message  A message or an Error object to log
     * @param  {Object[]}       args     Any additional arguments that should be logged
     * @public
     */
	static fatal(category, message, ...args) {
		if (!message) console.warn(new Date(), 'Log.fatal should always be called with a category and message');

		if (Log.shouldLogMessage(LOG_LEVEL.FATAL, category)) {
			console.error(new Date(), category, message, ...args);
		}
	}
}
