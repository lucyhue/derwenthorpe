import { Endpoint } from './Endpoint';

let registeredEndpoints = {};

/**
 * Registers an api endpoint
 * @param {string} endpoint.key - unique string identifying the base endpoint
 * @param {string} endpoint.method - xhr method to use
 * @param {string} endpoint.baseUrlKey - the key of baseUrl to prepend to the endpoint
 * @param {string} endpoint.endpoint - the endpoint
 * @param {function} endpoint.urlFunc - a function which given the baseUrl, endpoint and some args will generate the full url
 * @param {object} endpoint.headers - optional. Additional headers to pass to the xhr request - currently ignored
 * @param {function} endpoint.resultFunc - optional. A function which returns the result - used for testing
 * @param {string} endpoint.wsMessageType - optional. The type of a web socket message to send, using wapi rather than mapi.
 * @throws {Error} Will throw error if key is already registered
 * */
export function registerEndpoint(endpoint) {
	const { key } = endpoint;

	if (registeredEndpoints[key]) {
		throw new Error(
			`Attempt to register duplicate endpoint with key ${key}`
		);
	}

	registeredEndpoints[key] = endpoint;
}

/**
 * Registers an array of endpoints
 * @param {array} endpoints - array of endpoints
 * */
export function registerEndpoints(endpoints) {
	endpoints.forEach((ep) => {
		registerEndpoint(new Endpoint(ep));
	});
}

/**
 * This function, used for testing purposes only, is used to clear any registered endpoints
 * */
export function clearRegisteredEndpoints() {
	registeredEndpoints = {};
}

/**
 * Returns the registered http endpoint with the given key.
 * @param {string} endpointKey - unique string identifying the endpoint
 * @returns {object} - endpoint config
 * @throws {Error} Will throw error if endpointKey is not registered
 * */
export function lookupEndpoint(endpointKey) {
	const endpoint = registeredEndpoints[endpointKey];
	if (!endpoint) {
		throw new Error(
			`Attempt to use unregistered endpoint with key ${endpointKey}`
		);
	}

	return endpoint;
}
