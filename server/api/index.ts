const { Router } = require('express');
const axios = require('axios');
const { path } = require('ramda');

const { cabonlineApiHost } = require('../../utils/config.ts');

const router = Router();

const baseAsyncRequest = axios.create({
	baseURL: cabonlineApiHost,
	timeout: 20000
});

const apiResolver = function() {
	router.get('/', (_, res) => {
		res.json({
			message:
				'Välkommen till Cabonline apiet. Tillgängliga routes är /addresses?q=ADDRESS_VALUE och /vehicles?lng=LONGITUD&lat=LATITUD' /* tslint:disable-line */
		});
	});
	/**
	 * Adresses route
	 */
	router.get('/addresses', (req, res) => {
		baseAsyncRequest
			.get(`/addresses?q=${path(['query', 'q'], req)}`)
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
			.get(`/vehicles?lat=${path(['query', 'lat'], req)}&lng=${path(['query', 'lng'], req)}`)
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
