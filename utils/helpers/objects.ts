import { is, isEmpty } from 'ramda';

export const isObjectWithValues = object => {
	if (is(Object, object) && !isEmpty(object)) {
		return true;
	}
	return false;
};

export default isObjectWithValues;
