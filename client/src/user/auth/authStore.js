import isEqual from 'lodash.isequal';
import { registerReducer } from 'reduxStore/registerReducer';
import { authActions } from './authActions';

const initialState = {
	isAuthenticating: false,
	isLoading: false,
	error: null,
	user: null,
};

function handleSetIsAuthenticating(state, isAuthenticating) {
	if (state.isAuthenticating === isAuthenticating) {
		return state;
	}
	return {
		...state,
		isAuthenticating,
		error: null,
	};
}

function handleSetIsLoading(state, isLoading) {
	if (state.isLoading === isLoading) {
		return state;
	}
	return {
		...state,
		isLoading,
		error: null,
	};
}

function handleSetError(state, error) {
	if (isEqual(state.error, error)) {
		return state;
	}
	return {
		...state,
		isAuthenticating: false,
		isLoading: false,
		error,
	}
}

function handleSetUser(state, user) {
	return {
		...state,
		isAuthenticating: false,
		user,
	};
}

function handleUpdateUser(state, user) {
	const newUser = {
		...state.user,
		...user,
	};
	if (isEqual(state.user, newUser)) {
		return state;
	}
	return {
		...state,
		user: newUser,
	};
}

export function authStore(state = initialState, action) {

	switch (action.type) {

		case authActions.store.setIsAuthenticating.type:
			return handleSetIsAuthenticating(state, action.payload);

		case authActions.store.setIsLoading.type:
			return handleSetIsLoading(state, action.payload);

		case authActions.store.setError.type:
			return handleSetError(state, action.payload);

		case authActions.store.setUser.type:
			return handleSetUser(state, action.payload);

		case authActions.store.updateUser.type:
			return handleUpdateUser(state, action.payload);

		default:
			return state;
	}
}

registerReducer('auth', authStore);
