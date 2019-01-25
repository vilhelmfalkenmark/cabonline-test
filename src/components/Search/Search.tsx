import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { debounce } from 'utils/helpers/timing';
import { updateSearchTerm, searchForContent, selectAddress } from 'store/search/searchActions';
import Input from 'components/Input/Input';
import AddressList from 'components/AddressList/AddressList';
import SelectedAddress from 'components/SelectedAddress/SelectedAddress';

import styles from './Search.scss';

const s = classNames.bind(styles);

const SEARCH_DEBOUNCE_MILLISECONDS = 500;
const MINIMUM_SEARCH_CHARACTHERS = 3;

type Props = {
	searchTerm: String;
	fetching: Boolean;
	fulfilled: Boolean;
	rejected: Boolean;
	data: Array;
	updateSearchTerm: Function;
	searchForContent: Function;
};

class Search extends Component<Props> {
	constructor() {
		super();
		this.updateSearchTerm = this.updateSearchTerm.bind(this);
		this.searchForContent = debounce(SEARCH_DEBOUNCE_MILLISECONDS, this.searchForContent.bind(this));
		this.selectAddress = this.selectAddress.bind(this);
	}

	/**
	 * @function searchForContent
	 * @param {Object} address
	 */
	selectAddress(address) {
		this.props.selectAddress(address);
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
						onSelectCallback={this.selectAddress}
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
	selectAddress: address => {
		dispatch(selectAddress(address));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Search);
