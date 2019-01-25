import { is, isEmpty } from 'ramda';

export const isArrayWithContent = array => {
	if (is(Array, array) && !isEmpty(array)) {
		return true;
	}
	return false;
};

export default isArrayWithContent;
