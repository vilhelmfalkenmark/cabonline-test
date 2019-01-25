import React from 'react';
import Search from 'components/Search/Search';
import Map from 'components/Map/Map';

const IndexPage: React.FunctionComponent = () => {
	return (
		<main className={'main-container'}>
			<Search />
			<Map />
		</main>
	);
};

export default IndexPage;
