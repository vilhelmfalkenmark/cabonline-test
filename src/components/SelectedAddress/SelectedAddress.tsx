import React from 'react';
import classNames from 'classnames/bind';
import styles from './SelectedAddress.scss';
import { AddressEntity } from 'model/addressEntity';
import { isObjectWithValues } from 'utils/helpers/objects';

const s = classNames.bind(styles);

type Props = {
	selectedAddress: AddressEntity;
};

const SelectedAddress: React.FunctionComponent<Props> = ({ selectedAddress }) => {
	const getMarkup = () => {
		if (isObjectWithValues(selectedAddress) === false) {
			return <p>Ingen adress vald</p>;
		}

		const { streetName = null, zipCode = null, city = null, countryCode = null } = selectedAddress;

		return (
			<div className={s('address')}>
				<p className={s('text')}>{streetName}</p>
				<p className={s('text')}>{`${zipCode} ${city} ${countryCode}`}</p>
			</div>
		);

		return null;
	};

	return (
		<section className={s('container')}>
			{getMarkup()}

			{/* <p>{selectedAddress.streetName}</p> */}
		</section>
	);
};

export default SelectedAddress;
