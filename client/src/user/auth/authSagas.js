
import { put, call, take } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';

import { firebaseStorage } from 'firebaseHelpers/firebaseStorage';
import { localStorage, STORAGE_KEYS } from 'core/localStorage';
import { registerTakeEverySaga } from 'reduxMiddleware/sagaMiddleware';
import { authActions } from './authActions';
import { authService } from './authService';

function* setAuthUser(token, user) {
	yield call(localStorage.setItem, STORAGE_KEYS.AUTH_TOKEN, token);
	yield call(localStorage.setItem, STORAGE_KEYS.AUTH_USER, user);
	yield put(authActions.store.setUser(user));
}

export const authSagaHandlers = {

	signup: function* signup(action) {
		yield put(authActions.store.setIsAuthenticating(true));
		const { setOpenModal } = action.payload;

		const { response, error } = yield call(authService.signup, action.payload);
		if (error) {
			yield put(authActions.store.setError(error));
			return;
		}

		const { token, user } = response;
		yield call(setAuthUser, token, user);
		setOpenModal(null);
	},

	signin: function* login(action) {
		yield put(authActions.store.setIsAuthenticating(true));
		const { setOpenModal } = action.payload;

		const { response, error } = yield call(authService.signin, action.payload);
		if (error) {
			yield put(authActions.store.setError(error));
			return;
		}

		const { token, user } = response;
		yield call(setAuthUser, token, user);
		setOpenModal(null);
	},

	restoreLogin: function* restoreLogin() {
		const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
		if (!token) {
			return;
		}
		const decodedToken = jwtDecode(token);

		if (decodedToken.exp * 1000 < Date.now()) {
			yield call(setAuthUser, null, null);
			yield call(authService.logout);
			window.location.href = '/login';
		} else {
			const storedUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
			yield put(authActions.store.setUser(storedUser));

			yield put(authActions.store.setIsAuthenticating(true));
			const { response, error } = yield call(authService.fetchAuthenticatedUser);
			if (error) {
				yield put(authActions.store.setError(error));
				return;
			}
			const { user } = response;
			yield call(setAuthUser, token, user);
		}
	},

	forgotPassword: function* forgotPassword(action) {
		yield put(authActions.store.setIsAuthenticating(true));
		const { emailAddress, setOpenModal } = action.payload;

		const { error } = yield call(authService.resetPassword, emailAddress);
		if (error) {
			yield put(authActions.store.setError(error));
		}
		setOpenModal(null);
	},

	signout: function* signout() {
		yield call(setAuthUser, null, null);
		return yield call(authService.signout);
	},

	setAvatar: function* setAvatar(action) {
		const { user, avatar, status, setStatus } = action.payload;
		const { uid } = user;

		yield call(setStatus, { ...status, current: 'working' });
		const uploadChannel = yield call(firebaseStorage.createUploadFileChannel, `avatars/${uid}.png`, avatar);

		while (true) {
			const { uploadState, progress = 0, error, downloadUrl } = yield take(uploadChannel);
			console.log(`uploadState=${uploadState}`);

			if (error) {
				console.error('something went wrong during upload ', error);
				yield call(setStatus, { ...status, current: 'error', errorMessage: 'Something went wrong during upload.' });
				return;
			}
			if (downloadUrl) {
				console.log('Avatar available at', downloadUrl);
				try {
					user.avatarUrl = downloadUrl;
					console.log('setAvatar updating user ', user);
					const result = yield call(authService.updateUser, user);
					if (result.error) {
						yield put(authActions.store.setError(result.error));
						return;
					}
					yield put(authActions.store.updateUser(user));
					yield call(setStatus, { ...status, current: 'success' });
				} catch (err) {
					console.log('err', err);
				}
				return;
			}

			console.error('progess ', progress);
			yield call(setStatus, { ...status, progress });
		}
	},

	deleteAccount: function* deleteAccount() {
		console.log('deleteAccount');
		yield call(authService.deleteAccount);
	},

};

registerTakeEverySaga(authActions.saga.signup, authSagaHandlers.signup);
registerTakeEverySaga(authActions.saga.signin, authSagaHandlers.signin);
registerTakeEverySaga(authActions.saga.restoreLogin, authSagaHandlers.restoreLogin);
registerTakeEverySaga(authActions.saga.forgotPassword, authSagaHandlers.forgotPassword);
registerTakeEverySaga(authActions.saga.signout, authSagaHandlers.signout);
registerTakeEverySaga(authActions.saga.setAvatar, authSagaHandlers.setAvatar);
registerTakeEverySaga(authActions.saga.deleteAccount, authSagaHandlers.deleteAccount);
