import { put } from 'redux-saga/effects';
import { registerTakeEverySaga } from 'reduxMiddleware/sagaMiddleware';
import { appActions } from './appActions';

export const appSagaHandlers = {

	switchTheme: function* switchTheme(action) {
		yield put(appActions.store.setTheme(action.payload));
	},
};

registerTakeEverySaga(appActions.saga.switchTheme, appSagaHandlers.switchTheme);
