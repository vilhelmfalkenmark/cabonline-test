import React from 'react';
import classNames from 'classnames/bind';
import styles from './Map.scss';

const s = classNames.bind(styles);

const Map: React.FunctionComponent = () => {
	return <div className={s('container')} />;
};

export default Map;
