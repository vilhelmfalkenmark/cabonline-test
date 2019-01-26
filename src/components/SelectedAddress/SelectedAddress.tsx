import React from 'react';
import classNames from 'classnames/bind';
import styles from './SelectedAddress.scss';
import { AddressEntity } from 'model/addressEntity';
import { isObjectWithValues } from 'utils/helpers/objects';

const s = classNames.bind(styles);

interface Props {
	selectedAddress: AddressEntity;
	clearSelectedAddress: (() => void);
}

const SelectedAddress: React.FunctionComponent<Props> = ({ selectedAddress, clearSelectedAddress }) => {
	const getMarkup = () => {
		if (isObjectWithValues(selectedAddress) === false) {
			return <h4 className={s('heading')}>Ingen adress vald</h4>;
		}

		const { streetName = null, zipCode = null, city = null, countryCode = null } = selectedAddress;
		return (
			<header className={s('address')}>
				<div>
					<h4 className={s('heading')}>Du har valt adress:</h4>
					<p className={s('text')}>{streetName}</p>
					<p className={s('text')}>{`${zipCode} ${city} ${countryCode}`}</p>
				</div>
				<button className={s('button')} onClick={clearSelectedAddress}>
					Avboka
				</button>
			</header>
		);

		return null;
	};

	return (
		<section
			className={s('container', {
				container_addressIsSelected: selectedAddress.streetName
			})}
		>
			{getMarkup()}
		</section>
	);
};

export default SelectedAddress;
