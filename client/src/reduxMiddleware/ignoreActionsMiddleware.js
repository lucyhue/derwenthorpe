import { Log } from 'core/Log';
import { LOG_CATEGORY } from './middlewareConstants';

const DEFAULT_IGNORABLE_ACTIONS = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED'];
export const registeredIgnorableActions = DEFAULT_IGNORABLE_ACTIONS;

/**
 * Registers a set of actions which are to be ignored by the root store, and logging.
 * @param {Array} ignorableActions action types to register
 * @returns {void}
 */
export function registerIgnorableActions(ignorableActions) {
	registeredIgnorableActions.push(...ignorableActions);
}

/**
 * This middleware will cause the specified actions to be ignored.
 * If a listed action is dispatched it will go no further.
 * Note that this middleware comes after the sagas in the middleware sequence.
 * Thus ignored actions are still logged and processed by the sagas, but are not passed onto the store.
 *
 * @param {array} actionTypesToIgnore Array of action types which are ignored.
 * @returns {function} a dispatch function - see http://redux.js.org/docs/advanced/Middleware.html
 */
export const createIgnoreActionsMiddleware = () => (store) => (next) => (action) => {
	if (registeredIgnorableActions.includes(action.type)) {
		Log.warn(LOG_CATEGORY, 'ignoreActionsMiddleware ignoring action ', action.type);
		return null;
	}
	return next(action);
};
