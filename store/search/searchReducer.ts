import { SEARCH_FETCHING, SEARCH_FULFILLED, SEARCH_REJECTED, UPDATE_SEARCH_TERM } from 'store/actionTypes';

const iS = {
	searchTerm: '',
	fulfilled: false,
	fetching: false,
	rejected: false,
	errorMessage: null,
	data: {}
};

const searchReducer = (state = iS, action) => {
	switch (action.type) {
		case UPDATE_SEARCH_TERM: {
			/**
			 *  The reason we set fetching to true is due to the fact that the search
			 * execution is debounced and every time the user types we want to make
			 * sure they dont see the content from the old search results in a flicker.
			 */
			return { ...state, searchTerm: action.payload, fetching: true };
		}

		case SEARCH_FETCHING: {
			return { ...state, fetching: true, fulfilled: false, data: {} };
		}
		case SEARCH_FULFILLED: {
			return { ...state, fetching: false, fulfilled: true, data: { ...action.payload } };
		}
		case SEARCH_REJECTED: {
			return {
				...state,
				fetching: false,
				rejected: true,
				errorMessage: action.payload,
				fulfilled: false,
				data: {}
			};
		}
		default:
			return state;
	}
};

export default searchReducer;
