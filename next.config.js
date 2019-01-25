const withSass = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');
const path = require('path');

const CLIENT_PATH = path.join(__dirname, 'src');

module.exports = withTypescript({
	...withSass({
		cssModules: true,
		exportOnlyLocals: true,
		cssLoaderOptions: {
			importLoaders: 1,
			localIdentName: '[name]_[local]_[hash:base64:5]'
		},
		exclude: [path.resolve(CLIENT_PATH, 'styles/base.scss')],
		/**
		 * Custom webpack setup
		 */
		webpack(config) {
			/**
			 * Access all of our enviroment variables globally
			 * in both client and server.
			 */
			config.resolve.extensions.push('.scss');
			config.resolve.alias.styles = path.resolve(CLIENT_PATH, 'styles');
			// Return the custom webpack config
			return config;
		}
	})
});
