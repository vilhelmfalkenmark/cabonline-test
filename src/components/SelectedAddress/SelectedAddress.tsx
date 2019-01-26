import React from 'react';
import classNames from 'classnames/bind';
import styles from './SelectedAddress.scss';
import { IAddressEntity } from 'model/IAddressEntity';
import { isObjectWithValues } from 'utils/helpers/objects';

const s = classNames.bind(styles);

interface IProps {
	selectedAddress: IAddressEntity;
	clearSelectedAddress: (() => void);
}

const SelectedAddress: React.FunctionComponent<IProps> = ({ selectedAddress, clearSelectedAddress }) => {
	const getMarkup = () => {
		if (isObjectWithValues(selectedAddress) === false) {
			return <p>Ingen adress vald</p>;
		}

		const { streetName = null, zipCode = null, city = null, countryCode = null } = selectedAddress;
		return (
			<div className={s('address')}>
				<p className={s('text')}>{streetName}</p>
				<p className={s('text')}>{`${zipCode} ${city} ${countryCode}`}</p>
				<button onClick={clearSelectedAddress}>Rensa</button>
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
