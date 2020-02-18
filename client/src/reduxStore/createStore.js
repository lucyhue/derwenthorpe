import { createStore, combineReducers } from 'redux';
import { END } from 'redux-saga';
import { composeMiddleware } from 'reduxMiddleware/composeMiddleware';
import { setupSagaMiddleware, startSagas } from 'reduxMiddleware/sagaMiddleware';
import { registeredReducers } from './registerReducer';

/**
 * This function provides a means by which the root store and middleware are created and set up.
 * When createStoreAndMiddleware() is called all registered reducers
 * are combined into one root store. Also all registered sagas are composed
 * into one root saga. And various middleware components are configured.
 * @param {string} env indicates if in 'development' or 'production' environment
 * @return {object} redux store
 */
export function createStoreAndMiddleware() {
	// compose the middleware and reducers
	const sagaMiddleware = setupSagaMiddleware();
	const middleware = composeMiddleware(sagaMiddleware);
	const rootReducer = combineReducers(registeredReducers);

	// create the store
	const store = {
		...createStore(rootReducer, middleware),
		close: () => store.dispatch(END),
	}

	// and run the sagas
	startSagas(sagaMiddleware);

	return store;
}
