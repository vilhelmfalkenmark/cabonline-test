import {
	SEARCH_FETCHING,
	SEARCH_FULFILLED,
	SEARCH_REJECTED,
	UPDATE_SEARCH_TERM,
	SET_SELECTED_ADDRESS
} from 'store/actionTypes';

const iS = {
	searchTerm: '',
	fulfilled: false,
	fetching: false,
	rejected: false,
	errorMessage: null,
	selectedAddress: {},
	data: []
};

const searchReducer = (state = iS, action) => {
	switch (action.type) {
		case UPDATE_SEARCH_TERM: {
			return {
				...state,
				searchTerm: action.payload,
				fetching: false,
				data: []
			};
		}

		case SEARCH_FETCHING: {
			return { ...state, fetching: true, fulfilled: false, data: {} };
		}
		case SEARCH_FULFILLED: {
			return { ...state, fetching: false, fulfilled: true, data: [...action.payload.data] };
		}
		case SEARCH_REJECTED: {
			return {
				...state,
				fetching: false,
				rejected: true,
				errorMessage: action.payload,
				fulfilled: false,
				data: []
			};
		}
		case SET_SELECTED_ADDRESS: {
			return {
				...state,
				searchTerm: '',
				selectedAddress: { ...action.payload },
				data: []
			};
		}
		default:
			return state;
	}
};

export default searchReducer;
