import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'utils/helpers/timing';
import { updateSearchTerm, searchForContent } from 'store/search/searchActions';

import Input from 'components/Input/Input';

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

class SearchField extends Component<Props> {
	constructor() {
		super();
		this.updateSearchTerm = this.updateSearchTerm.bind(this);
		this.searchForContent = debounce(SEARCH_DEBOUNCE_MILLISECONDS, this.searchForContent.bind(this));
	}

	searchForContent(value) {
		if (value.length >= MINIMUM_SEARCH_CHARACTHERS) {
			this.props.searchForContent(value);
		}
	}

	updateSearchTerm(e) {
		this.props.updateSearchTerm(e.target.value);
		this.searchForContent(e.target.value);
		/**
		 * Open modal
		 */
		if (e.target.value.length >= MINIMUM_SEARCH_CHARACTHERS) {
			// if (e.target.value.length >= MINIMUM_SEARCH_CHARACTHERS && !this.props.search.modalIsOpen) {
			// this.props.openSearchResultModal();
		}
	}

	render() {
		const { searchTerm } = this.props;

		return <Input value={searchTerm} onChangeCallback={this.updateSearchTerm} placeholder="Sök" />;
	}
}

const mapStateToProps = ({ search }) => ({
	searchTerm: search.searchTerm,
	fetching: search.fetching
});

const mapDispatchToProps = dispatch => ({
	updateSearchTerm: searchTerm => {
		dispatch(updateSearchTerm(searchTerm));
	},
	searchForContent: searchTerm => {
		dispatch(searchForContent(searchTerm));
	},
	openSearchResultModal: () => {
		dispatch(openSearchResultModal());
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchField);
