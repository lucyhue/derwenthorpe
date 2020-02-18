export const registeredBaseUrls = {};

/**
 * Registers a set of base URL's.
 * This is intended to be called solely during app startup,
 * once the base URLs have been retrieved from app config.
 * @param {object} baseUrls - each url has a key, thus baseUrls[key] = urlString
 * @throws {Error} Will throw error if any baseUrl is already registered
 * */
export function registerBaseUrls(baseUrls) {
	Object.keys(baseUrls).forEach((key) => {
		if (registeredBaseUrls[key]) {
			throw new Error(
				`Attempt to register duplicate baseUrl with key ${key}`
			);
		}
		registeredBaseUrls[key] = baseUrls[key];
	});
}

/**
 * This function, used for testing purposes only, is used to clear any registered baseUrls
 * */
export function clearRegisteredBaseUrls() {
	Object.keys(registeredBaseUrls).forEach((key) => {
		delete registeredBaseUrls[key];
	});
}

/**
 * Returns the registered baseUrl with the given key.
 * @param {string} baseUrlKey - unique string identifying the base url
 * @returns {string} - baseUrl
 * @throws {Error} Will throw error if baseUrlKey is not registered
 * */
export function lookupBaseUrl(baseUrlKey) {
	const baseUrl = registeredBaseUrls[baseUrlKey];
	if (baseUrl === undefined) {
		throw new Error(
			`Attempt to use unregistered baseUrl with key ${baseUrlKey}`
		);
	}
	return baseUrl;
}
