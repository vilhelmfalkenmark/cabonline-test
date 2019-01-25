import React from 'react';
import classNames from 'classnames/bind';
import styles from './SelectedAddress.scss';

const s = classNames.bind(styles);

type Props = {
	selectedAddress: Object;
};

const SelectedAddress: React.FunctionComponent<Props> = ({ selectedAddress }) => {
	return (
		<section className={s('container')}>
			<p>{selectedAddress.streetName}</p>
		</section>
	);
};

export default SelectedAddress;
