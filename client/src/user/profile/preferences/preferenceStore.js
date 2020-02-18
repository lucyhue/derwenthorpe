import { isEqual } from 'lodash';
import { profileActions } from '../profileActions';
import { preferenceActions } from './preferenceActions';

const initialState = {};

function handleLoadPreferences(state, newPreferences) {
	if (isEqual({ ...state, ...newPreferences }, state)) {
		return state;
	}
	return {
		...state,
		...newPreferences,
	};
}

export function preferences(state = initialState, action) {

	switch (action.type) {

		case profileActions.profile.store.load.type:
			return handleLoadPreferences(state, action.payload.preferences);

		case preferenceActions.store.load.type:
			return handleLoadPreferences(state, action.payload);

		default:
			return state;
	}
}
