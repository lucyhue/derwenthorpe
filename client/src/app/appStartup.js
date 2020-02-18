import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as firebase from 'firebase/app';
import 'firebase/auth';
// import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { registerBaseUrls } from 'api';
import { App } from 'components/App/App';
import {
	GOOGLE_RECAPTCHA_URL,
	// SITE_KEY,
} from 'core/constants';
import { env } from 'core/environment';
import { FIREBASE_CONFIG, FIREBASE_FUNCTIONS_URL, LOCAL_FIREBASE_URL } from 'firebaseHelpers/firebaseConfig';
import { createStoreAndMiddleware } from 'reduxStore/createStore';
import { authActions } from 'user/auth';
import { startAuthStateListener } from 'user/auth/authStateListener';
import { ModalProvider } from 'components/Modals/ModalProvider';
import { AppThemeProvider } from './appThemeProvider';

function createAndInitialiseStore() {
	const store = createStoreAndMiddleware();
	store.dispatch(authActions.saga.restoreLogin.request());
	return store;
}

export function appStartup() {

	registerBaseUrls({
		firebase: env.isDev ? LOCAL_FIREBASE_URL : FIREBASE_FUNCTIONS_URL,
		googleRecaptcha: GOOGLE_RECAPTCHA_URL,
	});
	const store = createAndInitialiseStore();

	firebase.initializeApp(FIREBASE_CONFIG);
	startAuthStateListener();

	ReactDOM.render(
		<Provider store={store}>
			<AppThemeProvider>
				<ModalProvider >
					<App />
				</ModalProvider >
			</AppThemeProvider>
		</Provider >,
		document.getElementById('root')
	);
	// <GoogleReCaptchaProvider reCaptchaKey={SITE_KEY} >
	// </GoogleReCaptchaProvider>
}
