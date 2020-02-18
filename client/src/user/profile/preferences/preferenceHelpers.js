import { preferenceConfigs } from './preferenceRegistration';

export function validatePreferenceValue(key, value) {
	const config = preferenceConfigs[key];
	if (!config) {
		return `Attempt to set unknown preference "${key}"`;
	}
	if (config.isValid && !config.isValid(value)) {
		return `Attempt to set preference "${key}" with invalid value "${value}"`;
	}
	return null;
}

export function processRawPreferences(rawProfile) {
	const preferences = {};
	for (const key of Object.keys(preferenceConfigs)) {
		const rawValue = rawProfile.preferences ? rawProfile.preferences[key] : undefined;
		const value = rawValue || preferenceConfigs[key].default;
		const errorMessage = validatePreferenceValue(key, value);
		if (errorMessage) {
			throw new Error(errorMessage);
		}
		preferences[key] = value;
	}
	return {
		...rawProfile,
		preferences,
	};
}
