export class Endpoint {
	/**
     * Initialize a new instance of an Endpoint
     * @param {string}      options.key             Unique string identifying the endpoint
     * @param {string}      options.method          xhr method to use
     * @param {string}      options.baseUrlKey      The key of baseUrl to prepend to the endpoint
     * @param {string}      options.endpoint        The api endpoint - appended to baseUrl
     * @param {function}    options.urlFunc         Optional. A function which given the baseUrl, endpoint and some args will generate the full url
     * @param {function}    options.preProcess      Optional. A function which will perform some processing on the call data - e.g. dto mapping
     * @param {function}    options.postProcess     Optional. A function which will perform some processing on the returned data
     * @param {object}      options.headers         Optional. Additional headers to pass to the xhr request - currently ignored
     * @param {function}    options.resultFunc      Optional. A function which returns the result - used for testing
     * @param {string}      options.wsMessageType   Optional. The type of a web socket message to send, using wapi rather than mapi.
     */
	constructor({
		key,
		method,
		baseUrlKey,
		endpoint,
		urlFunc,
		preProcess,
		postProcess,
		headers,
		resultFunc,
		wsMessageType,
	}) {
		if (!key || !method || !endpoint) {
			throw new Error(
				'Invalid endpoint config; missing key, method, baseUrlKey or endpoint'
			);
		}

		this.key = key;
		this.method = method;
		this.baseUrlKey = baseUrlKey;
		this.endpoint = endpoint;
		this.urlFunc = urlFunc;
		this.preProcess = preProcess;
		this.postProcess = postProcess;
		this.headers = headers;
		this.resultFunc = resultFunc;
		this.wsMessageType = wsMessageType;
	}

	/**
     * Returns true if the endpoint is a web socket endpoint, with a defined wsMessageType.
     */
	get isWebSocketEndpoint() {
		return this.wsMessageType !== undefined;
	}
}
