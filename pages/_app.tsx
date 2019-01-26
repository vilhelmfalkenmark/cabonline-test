import App, { Container } from 'next/app';
import React from 'react';
import WithReduxStore from 'hocs/WithReduxStore/WithReduxStore';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { ReduxStateEntity } from 'model/reduxStateEntity';

import 'styles/main.scss';

interface Props {
	Component: React.ComponentType;
	pageProps: any;
	reduxStore: ReduxStateEntity;
}

class Cabonline extends App<Props> {
	public render() {
		const { Component, pageProps, reduxStore } = this.props;

		return (
			<Container>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta name="description" content={'Vilhelm Falkenmark test'} />
					<title>Cabonline test | Vilhelm Falkenmark</title>
				</Head>
				<Provider store={reduxStore}>
					<Component {...pageProps} />
				</Provider>
			</Container>
		);
	}
}

export default WithReduxStore(Cabonline);
