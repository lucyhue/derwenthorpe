
import { registerEndpoints, api, XHR_METHOD } from 'api';

export const AUTH_ENDPOINTS = [
	{
		key: 'signup',
		method: XHR_METHOD.POST,
		baseUrlKey: 'firebase',
		endpoint: 'signup',
	},
	{
		key: 'signin',
		method: XHR_METHOD.POST,
		baseUrlKey: 'firebase',
		endpoint: 'signin',
	},
	{
		key: 'fetchUser',
		method: XHR_METHOD.GET,
		baseUrlKey: 'firebase',
		endpoint: 'user/:uid',
	},
	{
		key: 'fetchAuthenticatedUser',
		method: XHR_METHOD.GET,
		baseUrlKey: 'firebase',
		endpoint: 'user',
	},
	{
		key: 'updateAuthenticatedUser',
		method: XHR_METHOD.POST,
		baseUrlKey: 'firebase',
		endpoint: 'user',
	},
	{
		key: 'resetPassword',
		method: XHR_METHOD.POST,
		baseUrlKey: 'firebase',
		endpoint: 'resetPassword',
	},
	{
		key: 'signout',
		method: XHR_METHOD.DELETE,
		baseUrlKey: 'firebase',
		endpoint: 'signout',
	},
];
registerEndpoints(AUTH_ENDPOINTS);

export const authService = {

	signup: (payload = {}, apiCaller = api) => (
		apiCaller('signup', payload)
	),

	signin: (payload = {}, apiCaller = api) => (
		apiCaller('signin', payload)
	),

	fetchUser: (payload = {}, apiCaller = api) => (
		apiCaller('fetchUser', payload)
	),

	fetchAuthenticatedUser: (payload = {}, apiCaller = api) => (
		apiCaller('fetchAuthenticatedUser', payload)
	),

	updateUser: (payload = {}, apiCaller = api) => (
		apiCaller('updateAuthenticatedUser', payload)
	),

	resetPassword: (payload = {}, apiCaller = api) => (
		apiCaller('resetPassword', payload)
	),

	signout: (payload = {}, apiCaller = api) => (
		apiCaller('signout', payload)
	),

};
