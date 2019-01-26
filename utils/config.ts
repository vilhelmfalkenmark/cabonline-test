const config = {
	envIsDev: process.env.NODE_ENV === 'development',
	envIsProd: process.env.NODE_ENV === 'production',
	localPort: 1337,
	externalApiHost: 'https://cabonline-frontend-test.herokuapp.com',
	internalApiHostDev: 'http://localhost:1337/api',
	internalApiHostProd: 'http://localhost:1337/api',
	mapDefaultCenter: {
		lat: 59.335269,
		lng: 18.061439
	},
	vehiclesPollInterval: 10000,
	searchDebounce: 500,
	minimumSearchCharacters: 3
};

module.exports = config;
