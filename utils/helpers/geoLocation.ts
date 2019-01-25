export const getPosition = options => {
	return new Promise(function(resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
};

export const getGeoLocation = getPosition()
	.then(position => position)
	.catch(err => {
		console.error(err.message);
		return err;
	});

export default getGeoLocation;
