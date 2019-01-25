import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducer from 'store/rootReducer';

const { envIsDev } = require('utils/config');

export function initializeStore(initialState = {}) {
	return envIsDev
		? createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
		: createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
}

export default initializeStore;
