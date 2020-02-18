import createSagaMiddleware from 'redux-saga';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { Log } from 'core/Log';
import { LOG_CATEGORY } from './middlewareConstants';

export const registeredSagas = [];

/**
 * Registers a saga for inclusion in root saga
 * @param {Array} saga to register
 * @returns {void}
 */
export function registerSaga(saga) {
	registeredSagas.push(saga);
}

/**
 * DO NOT USE. This function is exported solely for testing purposes.
 * @private
 * */
export function* takeEverySagaHandler(sagaAction, handler, action) {
	try {
		const response = yield call(handler, action);

		if ((response && response.error) || response instanceof Error) {
			yield put(
				sagaAction.failure(
					(response && response.error ? response.error : response),
					action.payload.request,
					action.meta
				)
			);
			return;
		}

		yield put(sagaAction.success(response, action.payload.request, action.meta));
	} catch (error) {
		yield put(sagaAction.failure(error, action.payload.request, action.meta));
	}
}

/**
 * @typedef {function} SagaActionHandler
 * A function that will process a redux action that has been fired
 * @param {object} action
 * @public
 */

/**
 * Registers a handler for processing an action.
 * This is achieved by creating a redux saga that wraps the handler in a takeEvery for the '.request' of the sagaAction you supply
 * This saga will automatically try {} catch {} the handler, and fire a '.success' or '.failure' (as approriate) once the handler is complete
 * @param {SagaAction} sagaAction The action whose '.request' you want to respond to and whose '.success' or '.failure' you want to issue
 * @param {SagaActionHandler} handler The handler to run process the action with
 * @returns {Saga} The saga that was registered
 */
export function registerTakeEverySaga(sagaAction, handler) {
	function* takeEverySaga() {
		yield takeEvery(
			sagaAction.request.type,
			takeEverySagaHandler,
			sagaAction,
			handler
		);
	}
	registerSaga(takeEverySaga);

	return takeEverySaga;
}

export function setupSagaMiddleware() {
	const sagaMiddleware = createSagaMiddleware({
		onError: (error) => {
			Log.error(
				LOG_CATEGORY,
				'An unexpected error has occurred during the processing of a saga.',
				error
			);
		},
	});

	return sagaMiddleware;
}

/**
 * Composes registered sagas into root saga.
 * @param {array} sagas registered sagas to compose
 * @returns {array} of forked sagas
 */
export function* composeRootSaga(sagas) {
	yield all(sagas.map(saga => fork(saga)));
}

export function startSagas(sagaMiddleware) {
	sagaMiddleware.run(composeRootSaga, registeredSagas);
}
