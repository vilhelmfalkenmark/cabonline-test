const config = {
	envIsDev: process.env.NODE_ENV === 'development',
	envIsProd: process.env.NODE_ENV === 'production',
	localPort: 1337,
	cabonlineApiHost: 'https://cabonline-frontend-test.herokuapp.com',
	internalApiHostDev: 'http://localhost:1337/api',
	internalApiHostProd: 'https://cabonline-vilhelmfalkenmark.herokuapp.com/api',
	mapDefaultCenter: {
		lat: 59.335269,
		lng: 18.061439
	},
	vehiclesPollInterval: 10000,
	searchDebounce: 500,
	minimumSearchCharacters: 3
};

module.exports = config;
