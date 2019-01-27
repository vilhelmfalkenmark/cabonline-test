import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { debounce } from 'utils/helpers/timing';
import {
	updateSearchTerm,
	searchForContent,
	setSelectedAddress,
	clearSelectedAddress
} from 'store/search/searchActions';
import { fetchVehiclesLocation } from 'store/vehicles/vehiclesActions';
import Input from 'components/Input/Input';
import AddressList from 'components/AddressList/AddressList';
import SelectedAddress from 'components/SelectedAddress/SelectedAddress';
import { AddressEntity } from 'model/addressEntity';
import { VehiclesPositionEntity } from 'model/positionEntitity';
import { InputEntity } from 'model/inputEntity';

import styles from './Header.scss';

const s = classNames.bind(styles);

const { vehiclesPollInterval, searchDebounce, minimumSearchCharacters } = require('utils/config');

interface Props {
	searchTerm: string;
	fetching: boolean;
	fulfilled: boolean;
	rejected: boolean;
	data: AddressEntity[];
	selectedAddress: AddressEntity;
	setSelectedAddress: ((AddressEntity) => AddressEntity);
	clearSelectedAddress: (() => void);
	fetchVehiclesLocation: ((VehiclesPositionEntity) => VehiclesPositionEntity);
	updateSearchTerm: ((searchTerm: string) => string);
	searchForContent: ((searchTerm: string) => string);
}

interface Header {
	pollId: number;
}

class Header extends React.Component<Props> {
	constructor(props) {
		super(props);
		this.updateSearchTerm = this.updateSearchTerm.bind(this);
		this.searchForContent = debounce(searchDebounce, this.searchForContent.bind(this));
		this.setSelectedAddress = this.setSelectedAddress.bind(this);
		this.clearSelectedAddress = this.clearSelectedAddress.bind(this);
		this.pollId = null;
	}

	public componentWillUnmount() {
		this.clearSelectedAddress();
	}

	/**
	 * @function setSelectedAddress
	 * @param {Object} selectedAddress
	 */
	public setSelectedAddress(selectedAddress: AddressEntity) {
		/**
		 * If a polling is currently active lets
		 * kill it before it setting a new.
		 */
		if (this.pollId) {
			window.clearInterval(this.pollId);
		}

		this.props.setSelectedAddress(selectedAddress);

		this.props.fetchVehiclesLocation({
			lng: selectedAddress.longitude,
			lat: selectedAddress.latitude
		});

		this.pollId = window.setInterval(
			() =>
				this.props.fetchVehiclesLocation({
					lng: selectedAddress.longitude,
					lat: selectedAddress.latitude
				}),
			vehiclesPollInterval
		);
	}

	/**
	 * @function clearSelectedAddress
	 * @returns {Void}
	 */
	public clearSelectedAddress() {
		window.clearInterval(this.pollId);
		this.props.clearSelectedAddress();
	}

	/**
	 * @function searchForContent
	 * @param {String} value
	 */
	public searchForContent(value) {
		if (value.length >= minimumSearchCharacters) {
			this.props.searchForContent(value);
		}
	}

	/**
	 * @function searchForContent
	 * @param {Object} target
	 */
	public updateSearchTerm(e: InputEntity) {
		this.props.updateSearchTerm(e.target.value);
		this.searchForContent(e.target.value);
	}

	public render() {
		const { searchTerm, fetching, data, fulfilled, selectedAddress } = this.props;
		return (
			<div className={s('container')}>
				<form
					className={s('form')}
					onSubmit={e => {
						e.preventDefault();
					}}
				>
					<Input value={searchTerm} onChangeCallback={this.updateSearchTerm} placeholder="Sök" />
					<AddressList
						data={data}
						fetching={fetching}
						fulfilled={fulfilled}
						onSelectCallback={this.setSelectedAddress}
					/>
				</form>
				<SelectedAddress selectedAddress={selectedAddress} clearSelectedAddress={this.clearSelectedAddress} />
			</div>
		);
	}
}

const mapStateToProps = ({ search }) => ({
	searchTerm: search.searchTerm,
	fetching: search.fetching,
	fulfilled: search.fulfilled,
	selectedAddress: search.selectedAddress,
	data: search.data
});

const mapDispatchToProps = dispatch => ({
	updateSearchTerm: searchTerm => {
		dispatch(updateSearchTerm(searchTerm));
	},
	searchForContent: searchTerm => {
		dispatch(searchForContent(searchTerm));
	},
	setSelectedAddress: selectedAddress => {
		dispatch(setSelectedAddress(selectedAddress));
	},
	clearSelectedAddress: () => {
		dispatch(clearSelectedAddress());
	},
	fetchVehiclesLocation: ({ lng, lat }) => {
		dispatch(fetchVehiclesLocation({ lng, lat }));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
