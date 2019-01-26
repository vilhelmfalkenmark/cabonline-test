import React from 'react';
import classNames from 'classnames/bind';
import { AddressEntity } from 'model/addressEntity';
import { isArrayWithContent } from 'utils/helpers/arrays';

import styles from './AddressList.scss';

const s = classNames.bind(styles);

interface Props {
	fetching: boolean;
	fulfilled: boolean;
	rejected: boolean;
	onSelectCallback: ((AddressEntity) => AddressEntity);
	data: AddressEntity[];
}

const AddressList: React.FunctionComponent<Props> = ({ fetching, data, rejected, fulfilled, onSelectCallback }) => {
	/**
	 * Fetching state
	 */
	if (fetching) {
		return (
			<ul
				className={s('container', {
					container_withOverlay: true
				})}
			>
				<li className={s('item')} />
				<li className={s('item')} />
				<li className={s('item')} />
				<li className={s('item')} />
				<li className={s('item')} />
				<li className={s('spinnerContainer')}>
					<figure className={s('spinner')} />
				</li>
			</ul>
		);
	}

	/**
	 * Fulfilled state
	 */
	if (isArrayWithContent(data) && fulfilled) {
		return (
			<ul className={s('container')}>
				{data.map(address => (
					<li key={address.id} className={s('item')}>
						<button onClick={() => onSelectCallback(address)} className={s('button')}>
							{address.streetName} - {address.city}
						</button>
					</li>
				))}
			</ul>
		);
	}

	/**
	 * Rejected state
	 */
	if (rejected) {
		return (
			<ul className={s('container')}>
				<li className={s('item')}>Datan kunde tyvärr inte hämtas!</li>
			</ul>
		);
	}

	return null;
};

export default AddressList;
