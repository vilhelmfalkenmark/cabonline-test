const { Router } = require('express');
const axios = require('axios');
const { externalApiHost } = require('../../utils/config.ts');

const router = Router();

const baseAsyncRequest = axios.create({
	baseURL: 'https://cabonline-frontend-test.herokuapp.com',
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
				res.sendStatus(404);
				res.json({ err });
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
				res.sendStatus(404);
				res.json({ err });
			});
	});
	return router;
};

module.exports = apiResolver;
