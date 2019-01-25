import axios from 'axios';
import { baseAsyncRequest } from 'utils/network/asyncRequestSetup';

import {
	SEARCH_FETCHING,
	SEARCH_FULFILLED,
	SEARCH_REJECTED,
	UPDATE_SEARCH_TERM,
	ADDRESS_SELECTED
} from 'store/actionTypes';

/**
 * @function selectAddress
 * @param {Object} address
 * @returns {Object} redux action
 */
export function selectAddress(address) {
	return {
		type: ADDRESS_SELECTED,
		payload: address
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
