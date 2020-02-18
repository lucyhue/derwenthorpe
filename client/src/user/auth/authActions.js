import {
	createSagaActions,
	createStoreAction,
} from 'reduxStore/actionCreators';

export const authActions = {
	saga: {
		signup: createSagaActions('AUTH', 'SIGNUP'),
		signin: createSagaActions('AUTH', 'SIGNIN'),
		restoreLogin: createSagaActions('AUTH', 'RESTORE_LOGIN'),
		forgotPassword: createSagaActions('AUTH', 'FORGOT_PASSWORD'),
		signout: createSagaActions('AUTH', 'SIGNOUT'),
		setAvatar: createSagaActions('AUTH', 'SET_AVATAR'),
		deleteAccount: createSagaActions('AUTH', 'DELETE_ACCOUNT'),
	},

	store: {
		setIsAuthenticating: createStoreAction('AUTH', 'SET_IS_AUTHENTICATING'),
		setIsLoading: createStoreAction('AUTH', 'SET_IS_LOADING_USER'),
		setError: createStoreAction('AUTH', 'SET_ERROR'),
		setUser: createStoreAction('AUTH', 'SET_USER'),
		updateUser: createStoreAction('AUTH', 'UPDATE_USER'),
	},
};
