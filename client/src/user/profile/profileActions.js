
import { createSagaActions, createStoreAction, registerIgnorableActionsFrom } from '@mood/javascript-core';
import { preferenceActions } from './preferences';

export const profileActions = {
	profile: {
		saga: {
			/**
             * Load the current users profile from the user service.
             */
			load: createSagaActions('USER_LOAD_PROFILE'),

			/**
             * Save the current users profile from the profile store to the user service.
             */
			save: createSagaActions('USER_SAVE_PROFILE'),
		},

		store: {
			/**
             * Store the loaded profile into the profile store.
             * @param object profile
             */
			load: createStoreAction('USER_STORE_PROFILE'),
		},

	},
	preferences: preferenceActions,
};
registerIgnorableActionsFrom(profileActions.profile.saga);
