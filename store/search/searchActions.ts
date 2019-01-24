import { contentAsyncRequest } from 'utils/network/asyncRequestSetup';

import { SEARCH_FETCHING, SEARCH_FULFILLED, SEARCH_REJECTED, UPDATE_SEARCH_TERM } from 'store/actionTypes';

/**
 * @function updateSearchTerm
 * @param {String} searchTerm e.g "Kungsgatan"
 * @returns {Object} redux action
 */
export function updateSearchTerm(searchTerm) {
	return {
		type: UPDATE_SEARCH_TERM,
		payload: searchTerm
	};
}

export default '';
