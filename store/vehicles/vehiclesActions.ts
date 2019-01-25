import { baseAsyncRequest } from 'utils/network/asyncRequestSetup';

import { VEHICLES_LOCATION_FETCHING, VEHICLES_LOCATION_FULFILLED, VEHICLES_LOCATION_REJECTED } from 'store/actionTypes';

/**
 * @function fetchVehiclesLocation
 * @param {Number} lng
 * @param {Number} lat
 * @returns {Object} redux action wrapped in a promise
 */
export function fetchVehiclesLocation({ lng, lat }) {
	return dispatch => {
		dispatch({ type: VEHICLES_LOCATION_FETCHING });
		return baseAsyncRequest
			.get(`/vehicles?lat=${lat}&lng=${lng}`)
			.then(({ data }) => dispatch({ type: VEHICLES_LOCATION_FULFILLED, payload: data }))
			.catch(err => {
				dispatch({ type: VEHICLES_LOCATION_REJECTED, payload: err });
			});
	};
}

export default fetchVehiclesLocation;
