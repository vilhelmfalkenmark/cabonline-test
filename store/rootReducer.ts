import { combineReducers } from 'redux';
import search from 'store/search/searchReducer';
import vehicles from 'store/vehicles/vehiclesReducer';

const rootReducer = combineReducers({
	search,
	vehicles
});

export default rootReducer;
