
import { put, select } from 'redux-saga/effects';
import { registerTakeEverySaga } from '@mood/javascript-core';
import { profileActions } from '../profileActions';
import { preferenceActions } from './preferenceActions';
import { preferenceSelectors } from './preferenceSelectors';
import { preferenceConfigs } from './preferenceRegistration';
import { validatePreferenceValue } from './preferenceHelpers';

export function* setPreferencesHandler(action) {
	const preferences = action.payload.request;

	// Validate the preferences
	for (const key of Object.keys(preferences)) {
		const value = preferences[key];
		const errorMessage = validatePreferenceValue(key, value);
		if (errorMessage) {
			throw new Error(errorMessage);
		}
	}

	// store them in the preferenceStore
	yield put(preferenceActions.store.load(preferences));

	// persist whole updated profile
	yield put(profileActions.profile.saga.save.request());
}
registerTakeEverySaga(preferenceActions.saga.set, setPreferencesHandler);

export function* togglePreferenceHandler(action) {
	const key = action.payload.request;

	if (!preferenceConfigs[key]) {
		throw new Error(`Unknown preference ${key} passed to togglePreference`);
	}
	if (typeof preferenceConfigs[key].toggler !== 'function') {
		throw new Error(`Preference ${key} can not be toggled`);
	}

	const oldValue = yield select(preferenceSelectors.byKey, key);
	const newValue = preferenceConfigs[key].toggler(oldValue);

	// store it in the preferenceStore
	yield put(preferenceActions.store.load({ [key]: newValue }));

	// persist whole updated profile
	yield put(profileActions.profile.saga.save.request());
}
registerTakeEverySaga(preferenceActions.saga.toggle, togglePreferenceHandler);
