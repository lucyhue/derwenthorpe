
import { MINE_ONLY_PREFERENCE_KEY, THEME_PREFERENCE_KEY } from './preferenceConstants';

/**
 * This class can be used to safely create a new preference config object.
 * @param {Object} config preference configuration object
 */
export class PreferenceConfig {
	constructor(config) {
		this.key = config.key;
		this.default = config.default;
		this.isValid = config.isValid;
		this.toggler = config.toggler;
	}
}

/**
 * This object holds registered preference configs
 */
export const preferenceConfigs = {};

/**
 * Registers a new preference config.
 * @param {Object} config preference configuration object
 */
export function registerPreference(config) {
	preferenceConfigs[config.key] = new PreferenceConfig(config);
}

/**
 * Clears all registered preference configs.
 * For testing purposes only.
 */
export function clearRegisteredPreferences() {
	for (const key in preferenceConfigs) {
		if (Object.prototype.hasOwnProperty.call(preferenceConfigs, key)) {
			delete preferenceConfigs[key];
		}
	}
}

registerPreference({
	key: MINE_ONLY_PREFERENCE_KEY,
	default: false,
	isValid: value => (typeof value === 'boolean'),
	toggler: value => !value,
});

registerPreference({
	key: THEME_PREFERENCE_KEY,
	default: 'light',
	isValid: value => (value === 'dark' || value === 'light'),
	toggler: value => (value === 'dark' ? 'light' : 'dark'),
});
