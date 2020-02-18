import { createLogger } from 'redux-logger';
import { localStorage } from 'core/localStorage';
import { registeredIgnorableActions } from './ignoreActionsMiddleware';

/**
 * Set up logger middleware
 * @returns {function} logger middleware function
 */
export function createLoggerMiddleware() {
	return createLogger({
		collapsed: true,
		predicate: (getState, action) =>
			!registeredIgnorableActions.includes(action.type) &&
			localStorage.getItem('logReduxActions') === true,
	});
}
