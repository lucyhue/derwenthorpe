
import { registerEndpoints, mapiSend, XHR_METHOD } from '@mood/javascript-core';

export const PROFILE_ENDPOINTS = [
	{
		key: 'fetchProfile',
		method: XHR_METHOD.GET,
		baseUrlKey: 'explorerApi',
		endpoint: 'gateway/userClientStorage/get',
		postProcess: response => response.userClientData,
	},
	{
		key: 'saveProfile',
		method: XHR_METHOD.POST,
		baseUrlKey: 'explorerApi',
		endpoint: 'gateway/userClientStorage/upsert',
	},
];
registerEndpoints(PROFILE_ENDPOINTS);

export const profileService = {

	fetchProfile: (payload, mapiCaller = mapiSend) => (
		mapiCaller('fetchProfile', null, payload)
	),

	saveProfile: (payload, mapiCaller = mapiSend) => (
		mapiCaller('saveProfile', null, payload)
	),

};
