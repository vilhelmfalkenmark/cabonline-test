import React from 'react';
import Search from 'components/Search/Search';
import MapWrapper from 'components/Map/MapWrapper';

const IndexPage: React.FunctionComponent = () => {
	return (
		<main className={'main-container'}>
			<Search />
			<MapWrapper />
		</main>
	);
};

export default IndexPage;
