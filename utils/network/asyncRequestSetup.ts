import axios from 'axios';
/**
 * @function baseAsyncRequest
 */
export const baseAsyncRequest = axios.create({
	baseURL: 'http://localhost:1337/api', // TODO Make into config
	timeout: 20000
});

export default baseAsyncRequest;
