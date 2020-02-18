import store from 'store';
import { APP_NAMESPACE } from './constants';

export const STORAGE_KEYS = {
	AUTH_TOKEN: 'AUTH_TOKEN',
	AUTH_USER: 'AUTH_USER',
};

export const buildStorageKey = (key) => {
	return `${APP_NAMESPACE}.${key}`;
}

export const localStorage = {
	/**
     * Sets the value of an item within the store if possible.
     * @param  {String}  key  The key to use to access the store
     * @param  {Object}  value The value to place in the store alongside this key
     * @returns {Boolean}      True if the store was updated, false if it could not be updated for any reason (e.g. localStorage is disabled)
     */
	setItem(key, value) {
		if (!store.enabled) {
			return false;
		}

		store.set(buildStorageKey(key), value);
		return true;
	},

	/**
     * Retrieve an item from Local Storage if possible
     * @param  {String} key The key to use to access the store
     * @returns {Object} The value from local storage or undefined
     */
	getItem(key) {
		if (!store.enabled) {
			return undefined;
		}

		return store.get(buildStorageKey(key));
	},

	/**
     * Retrieve a set of items from Local Storage as an Array if possible, using comma delimiting
     * @param  {String} key The key to use to access the store
     * @returns {Array} An array of values, or an empty array if the store could not be read/parsed
     */
	getArray(key) {
		if (!store.enabled) {
			return [];
		}

		const item = store.get(buildStorageKey(key));
		if (!item && typeof item !== 'string') {
			return [];
		}

		return item.split(',').map((s) => s.trim());
	},

	/**
     * Removes an item from the store if possible
     * @param  {String} key The key to use to access the store
     * @returns {Boolean} True if the store entry was removed, false if it could not be removed for any reason (e.g. localStorage is disabled)
     */
	removeItem(key) {
		if (!store.enabled) {
			return false;
		}

		store.remove(buildStorageKey(key));
		return true;

	},
};
