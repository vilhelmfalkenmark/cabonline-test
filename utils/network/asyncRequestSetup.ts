import axios from 'axios';
const { envIsDev, internalApiHostDev, internalApiHostProd } = require('utils/config');

/**
 * @function baseAsyncRequest
 */
export const baseAsyncRequest = axios.create({
	baseURL: envIsDev ? internalApiHostDev : internalApiHostProd,
	timeout: 20000
});

export default baseAsyncRequest;
