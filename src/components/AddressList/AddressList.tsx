import React from 'react';
import classNames from 'classnames/bind';
import { IAddressEntity } from 'model/IAddressEntity';

import styles from './AddressList.scss';

const s = classNames.bind(styles);

interface IProps {
	fetching: boolean;
	fulfilled: boolean;
	rejected: boolean;
	onSelectCallback: ((IAddressEntity) => IAddressEntity);
	data: IAddressEntity[];
}

const AddressList: React.FunctionComponent<IProps> = ({ fetching, data, rejected, fulfilled, onSelectCallback }) => {
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

	if (data.length && fulfilled) {
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

	return null;
};

export default AddressList;
