const express = require('express');
const next = require('next');
const api = require('./api/index.ts');

const isDev = process.env.NODE_ENV === 'development';

const app = next({ dev: isDev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 1337;

app.prepare()
	.then(() => {
		const server = express();

		// Api request
		server.use('/api', api());

		// Search Page
		server.get('/', (req, res) => {
			app.render(req, res, '/index');
		});
		/**
		 * 404
		 */
		server.get('*', (req, res) => {
			return handle(req, res);
		});

		server.listen(PORT, err => {
			if (err) throw err;
			console.log(`Ready on http://localhost:${PORT}`); // eslint-disable-line
		});
	})
	.catch(ex => {
		console.error(ex.stack); // eslint-disable-line
		process.exit(1);
	});
