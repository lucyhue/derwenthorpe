import superagent from 'superagent';
import { localStorage, STORAGE_KEYS } from 'core/localStorage';
import { Enum } from 'core/Enum';
import { lookupEndpoint } from './endpointRegistration';
import { lookupBaseUrl } from './baseUrlRegistration';

export const XHR_METHOD = new Enum('GET', 'POST', 'DELETE');

function interpolateArgs(string, args) {
	return Object.keys(args).reduce((str, key) => str.replace(`:${key}`, args[key]), string);
}

function buildUrl(ep, payload) {
	const { baseUrlKey, endpoint } = ep;
	const baseUrl = lookupBaseUrl(baseUrlKey);
	const epUrl = interpolateArgs(endpoint, payload);
	return `${baseUrl}/${epUrl}`;
}

function buildHeaders(ep) {
	const defaultHeaders = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	};
	const authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
	if (authToken) {
		defaultHeaders.Authorization = `Bearer ${authToken}`;
	}
	return { ...defaultHeaders, ...ep.headers };
}

export async function api(endpointKey, payload) {
	const ep = lookupEndpoint(endpointKey);
	const url = buildUrl(ep, payload);
	const headers = buildHeaders(ep);

	try {
		let xhr;
		switch (ep.method) {
			case XHR_METHOD.GET:
				console.log('api GET to ', url, payload);
				xhr = superagent.get(url).query(payload);
				break;
			case XHR_METHOD.POST:
				console.log('api POST to ', url, payload);
				xhr = superagent.post(url).send(payload);
				break;
			case XHR_METHOD.DEL:
				xhr = superagent.delete(url);
				break;
			default:
				throw new Error(`Unexpected xhr method ${ep.method}`);
		}
		xhr.set(headers);
		const response = await xhr;
		return { response: response.body };
	} catch (error) {
		return { error: error.response.body };
	}
}
