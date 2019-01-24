import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { NODE_ENV_IS_DEV } from 'constants/environmentVariables';
import reducer from 'store/rootReducer';

export function initializeStore(initialState = {}) {
	return true // FIX
		? createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
		: createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
}

export default initializeStore;
