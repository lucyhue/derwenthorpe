
import { createSagaActions, createStoreAction, registerIgnorableActionsFrom } from '@mood/javascript-core';

export const preferenceActions = {
	saga: {
		/**
         * Update/insert preferences to the profile store,
         * and save this change to the user service.
         * @param object preferences
         */
		set: createSagaActions('USER_SET_PREFERENCES'),

		/**
         * Toggle an individual preferences in the profile store,
         * and save this change to the user service.
         * @param string preference key
         */
		toggle: createSagaActions('USER_TOGGLE_PREFERENCE'),

		/**
         * Clear preferences to the profile store,
         * and save this change to the user service.
         */
		clear: createSagaActions('USER_CLEAR_PREFERENCES'),
	},

	store: {
		/**
         * Store a set of preferences in the profile store.
         * This is called during startup to store loaded preferences.
         * @param object preferences
         */
		load: createStoreAction('USER_STORE_PREFERENCES'),
	},

};
registerIgnorableActionsFrom(preferenceActions.saga);
