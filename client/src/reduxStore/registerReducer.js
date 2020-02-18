export const registeredReducers = {};

/**
 * Registers a reducer for inclusion in root store
 * @param {String} key of the reducer
 * @param {Function} reducer to register
 * @returns {void}
 */
export function registerReducer(key, reducer) {
	registeredReducers[key] = reducer;
}
