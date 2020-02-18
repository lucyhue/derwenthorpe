import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import multi from 'redux-multi';
import { composeWithDevTools } from 'redux-devtools-extension';
import { env } from 'core/environment';
import { createLoggerMiddleware } from './loggerMiddleware';
import { createIgnoreActionsMiddleware } from './ignoreActionsMiddleware';

export function composeMiddleware(sagaMiddleware) {
	const middlewareSequence = [
		thunk,
		multi,
		sagaMiddleware,
	];

	if (env.isDev) {
		middlewareSequence.push(createLoggerMiddleware());
	}
	middlewareSequence.push(createIgnoreActionsMiddleware());

	// decide which composer to use and compose the middleware
	const composer = env.isProd ? compose : composeWithDevTools;
	return composer(applyMiddleware(...middlewareSequence));
}
