import { combineReducers } from 'redux';
import { registerReducer } from 'redux-store';
import { preferences } from './preferences';

export const profile = combineReducers({
	preferences,
});
registerReducer('profile', profile);
