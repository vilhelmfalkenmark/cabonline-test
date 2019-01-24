import axios from 'axios';
/**
 * @function baseAsyncRequest
 */
export const baseAsyncRequest = axios.create({
	baseURL: 'https://cabonline-frontend-test.herokuapp.com/', // TODO Make into config
	timeout: 20000
});

export default contentAsyncRequest;
