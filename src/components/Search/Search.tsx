import React, { Component } from 'react';
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

import styles from './Search.scss';

const s = classNames.bind(styles);

const SEARCH_DEBOUNCE_MILLISECONDS = 500;
const MINIMUM_SEARCH_CHARACTHERS = 3;

type Props = {
	searchTerm: string;
	fetching: boolean;
	fulfilled: boolean;
	rejected: boolean;
	data: AddressEntity[];
	setSelectedAddress: ((AddressEntity) => AddressEntity);
	updateSearchTerm: ((string) => string);
	searchForContent: ((string) => string);
};

class Search extends Component<Props> {
	constructor() {
		super();
		this.updateSearchTerm = this.updateSearchTerm.bind(this);
		this.searchForContent = debounce(SEARCH_DEBOUNCE_MILLISECONDS, this.searchForContent.bind(this));
		this.setSelectedAddress = this.setSelectedAddress.bind(this);
	}

	/**
	 * @function setSelectedAddress
	 * @param {Object} selectedAddress
	 */
	setSelectedAddress(selectedAddress) {
		this.props.setSelectedAddress(selectedAddress);

		this.props.fetchVehiclesLocation({
			lng: selectedAddress.longitude,
			lat: selectedAddress.latitude
		});
	}

	/**
	 * @function clearSelectedAddress
	 * @param {Object} address
	 */
	clearSelectedAddress() {
		this.props.clearSelectedAddress();
	}

	/**
	 * @function searchForContent
	 * @param {String} value
	 */
	searchForContent(value) {
		if (value.length >= MINIMUM_SEARCH_CHARACTHERS) {
			this.props.searchForContent(value);
		}
	}

	/**
	 * @function searchForContent
	 * @param {Object} target
	 */
	updateSearchTerm({ target }) {
		this.props.updateSearchTerm(target.value);
		this.searchForContent(target.value);
	}

	render() {
		const { searchTerm, fetching, data, fulfilled, selectedAddress } = this.props;
		return (
			<div className={s('container')}>
				<form className={s('form')}>
					<Input value={searchTerm} onChangeCallback={this.updateSearchTerm} placeholder="Sök" />
					<AddressList
						data={data}
						fetching={fetching}
						fulfilled={fulfilled}
						onSelectCallback={this.setSelectedAddress}
					/>
				</form>
				<SelectedAddress selectedAddress={selectedAddress} />
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
)(Search);
