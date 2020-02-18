import { preferenceConfigs } from './preferenceRegistration';

export const preferenceSelectors = {

	/**
     * Returns the preferences for the current user
     * @param object state
     * @return object preferences
     */
	all: state => state.profile.preferences,

	/**
     * Returns the value for the preference with the given key.
     * If the given preference is not set the configured default value is returned.
     * @param object state
     * @param string preference key
     * @return any preference value
     */
	byKey: (state, key) => {
		if (!key || !preferenceConfigs[key]) {
			throw new Error(`Attempt to access preference with undefined key = ${key}`);
		}
		const value = state.profile && state.profile.preferences ? state.profile.preferences[key] : undefined;
		const defaultValue = preferenceConfigs[key].default;
		return value || defaultValue;
	},

};
