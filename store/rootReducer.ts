import { combineReducers } from 'redux';
import search from 'store/search/searchReducer';

const rootReducer = combineReducers({
	search
});

export default rootReducer;
