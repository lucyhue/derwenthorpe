import {
	createSagaActions,
	createStoreAction,
} from 'reduxStore/actionCreators';

export const appActions = {
	saga: {

		// Switch themes
		switchTheme: createSagaActions('APP', 'SWITCH_THEME'),
	},

	store: {

		// Sets the current theme
		setTheme: createStoreAction('APP', 'SET_THEME'),
	},
};
