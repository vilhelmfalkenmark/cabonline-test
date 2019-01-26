import { path } from 'ramda';
import { isArrayWithContent } from 'utils/helpers/arrays';

export const getVehiclesPositions = vehiclesReduxState => {
	const vehiclesData = path(['data'], vehiclesReduxState);

	if (isArrayWithContent(vehiclesData)) {
		return vehiclesData;
	}

	return null;
};

export default getVehiclesPositions;
