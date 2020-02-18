import { registerReducer } from 'reduxStore/registerReducer';
import { appActions } from './appActions';
import { appThemes } from './appThemes';
import { LIGHT_THEME_KEY } from './appConstants';

const initialState = {
	themes: appThemes(),
	currentTheme: LIGHT_THEME_KEY,
};

function handleSetTheme(state, currentTheme) {
	return {
		...state,
		currentTheme,
	};
}

export function appStore(state = initialState, action) {

	const { type, payload } = action;

	switch (type) {

		case appActions.store.setTheme.type:
			return handleSetTheme(state, payload);

		default:
			return state;
	}
}

registerReducer('app', appStore);
