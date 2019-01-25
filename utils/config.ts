const config = {
	envIsDev: process.env.NODE_ENV === 'development',
	envIsProd: process.env.NODE_ENV === 'production',
	localPort: 1337,
	externalApiHost: 'https://cabonline-frontend-test.herokuapp.com',
	internalApiHostDev: 'http://localhost:1337/api',
	internalApiHostProd: 'http://localhost:1337/api'
};

module.exports = config;
