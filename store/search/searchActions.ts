import { baseAsyncRequest } from 'utils/network/asyncRequestSetup';

import {
	SEARCH_FETCHING,
	SEARCH_FULFILLED,
	SEARCH_REJECTED,
	UPDATE_SEARCH_TERM,
	SET_SELECTED_ADDRESS,
	CLEAR_SELECTED_ADDRESS
} from 'store/actionTypes';

/**
 * @function setSelectedAddress
 * @param {Object} selectedAddress
 * @returns {Object} redux action
 */
export function setSelectedAddress(selectedAddress) {
	return {
		type: SET_SELECTED_ADDRESS,
		payload: selectedAddress
	};
}

/**
 * @function clearSelectedAddress
 * @returns {Object} redux action
 */
export function clearSelectedAddress() {
	return {
		type: CLEAR_SELECTED_ADDRESS
	};
}

/**
 * @function updateSearchTerm
 * @param {String} searchTerm e.g "Kungsgatan 5"
 * @returns {Object} redux action
 */
export function updateSearchTerm(searchTerm) {
	return {
		type: UPDATE_SEARCH_TERM,
		payload: searchTerm
	};
}

/**
 * @function searchForContent
 * @param {String} searchTerm e.g "Örebro"
 * @returns {Object} redux action wrapped in a promise
 */
export function searchForContent(searchTerm) {
	return dispatch => {
		dispatch({ type: SEARCH_FETCHING });
		return baseAsyncRequest
			.get(`/addresses?q=${searchTerm}`) // E.g https://cabonline-frontend-test.herokuapp.com/addresses?q=sveavägen
			.then(({ data }) => dispatch({ type: SEARCH_FULFILLED, payload: data }))
			.catch(err => {
				dispatch({ type: SEARCH_REJECTED, payload: err });
			});
	};
}

export default updateSearchTerm;
