/**
 * @function throttle
 */
export const throttle = (delay, fn) => {
	let lastCall = 0;
	return function(...args) {
		const now = new Date().getTime();
		if (now - lastCall < delay) {
			return;
		}
		lastCall = now;
		return fn(...args);
	};
};

/**
 * @function debounce
 */
export const debounce = (delay, fn) => {
	let timerId;
	return function(...args) {
		if (timerId) {
			clearTimeout(timerId);
		}
		timerId = setTimeout(() => {
			fn(...args);
			timerId = null;
		}, delay);
	};
};

export default debounce;
