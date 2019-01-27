import React from 'react';
import Header from 'components/Header/Header';
import MapWrapper from 'components/Map/MapWrapper';

const IndexPage: React.FunctionComponent = () => {
	return (
		<main className={'main-container'}>
			<Header />
			<MapWrapper />
		</main>
	);
};

export default IndexPage;
