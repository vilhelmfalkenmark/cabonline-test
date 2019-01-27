import App, { Container } from 'next/app';
import React from 'react';
import WithReduxStore from 'hocs/WithReduxStore/WithReduxStore';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { ReduxStateEntity } from 'model/reduxStateEntity';

import 'styles/main.scss';

interface Props {
	Component: React.ComponentType;
	reduxStore: ReduxStateEntity;
}

class Cabonline extends App<Props> {
	public render() {
		const { Component, reduxStore } = this.props;

		return (
			<Container>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta name="description" content={'Vilhelm Falkenmark Cabonline test'} />
					<title>Cabonline test | Vilhelm Falkenmark</title>
				</Head>
				<Provider store={reduxStore}>
					<Component />
				</Provider>
			</Container>
		);
	}
}

export default WithReduxStore(Cabonline);
