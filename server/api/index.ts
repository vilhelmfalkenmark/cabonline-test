const { Router } = require('express');
const axios = require('axios');

const router = Router();

const baseAsyncRequest = axios.create({
	baseURL: 'https://cabonline-frontend-test.herokuapp.com', // TODO Make into config
	timeout: 20000
});

const apiResolver = function() {
	router.get('/', (_, res) => {
		res.json({ message: 'Välkommen till Cabonline apiet' });
	});
	/**
	 * Adresses route
	 */
	router.get('/addresses', (req, res) => {
		baseAsyncRequest
			.get(`/addresses?q=${req.query.q}`)
			.then(({ data }) => {
				res.json({ data });
			})
			.catch(err => {
				res.json({ err: true });
			});
	});
	/**
	 * Veichles route
	 */
	router.get('/vehicles', (req, res) => {
		baseAsyncRequest
			.get(`/vehicles?lat=${req.query.lat}&lng=${req.query.lng}`)
			.then(({ data }) => {
				res.json({ data });
			})
			.catch(err => {
				res.json({ err: true });
			});
	});
	return router;
};

module.exports = apiResolver;
