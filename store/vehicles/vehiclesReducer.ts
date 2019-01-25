import {
	VEHICLES_LOCATION_FETCHING,
	VEHICLES_LOCATION_FULFILLED,
	VEHICLES_LOCATION_REJECTED,
	CLEAR_SELECTED_ADDRESS
} from 'store/actionTypes';

const iS = {
	polling: false,
	fulfilled: false,
	fetching: false,
	rejected: false,
	errorMessage: null,
	data: []
};

const vehiclesReducer = (state = iS, action) => {
	switch (action.type) {
		case VEHICLES_LOCATION_FETCHING: {
			return {
				...state,
				fetching: true,
				polling: true
			};
		}

		case VEHICLES_LOCATION_FULFILLED: {
			return { ...state, fetching: false, fulfilled: true, data: [...action.payload.data] };
		}

		case VEHICLES_LOCATION_REJECTED: {
			return { ...state, fetching: false, rejected: true };
		}

		case CLEAR_SELECTED_ADDRESS: {
			return { ...iS };
		}

		default:
			return state;
	}
};

export default vehiclesReducer;
