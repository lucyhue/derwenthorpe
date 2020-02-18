import { call, put, select } from 'redux-saga/effects';
import { registerTakeEverySaga, Log } from '@mood/javascript-core';
import { LOG_CATEGORY } from '../constants';
import { profileActions } from './profileActions';
import { processRawPreferences } from './preferences';
import { profileService } from './profileService';

export function* loadProfileHandler(action) {
	// make api call to fetch profile from user service
	const { response, error } = yield call(profileService.fetchProfile, action.payload.request);
	if (error) {
		Log.error(LOG_CATEGORY, error);
		return error;
	}
	const rawProfile = response;

	// process the preferences
	const profile = yield call(processRawPreferences, rawProfile);

	// put the profile into the store
	yield put(profileActions.profile.store.load(profile));

	return response;

}
registerTakeEverySaga(profileActions.profile.saga.load, loadProfileHandler);

export function* saveProfileHandler(action) {
	// get the profile
	const { profile } = yield select();

	// make api call to send profile to user service
	const { response, error } = yield call(profileService.saveProfile, profile);
	if (error) {
		Log.error(LOG_CATEGORY, error);
		return error;
	}
	return response;

}
registerTakeEverySaga(profileActions.profile.saga.save, saveProfileHandler);
