import React, { Component } from 'react';
import { connect } from 'react-redux';
import { path } from 'ramda';
import classNames from 'classnames/bind';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import styles from './Map.scss';
import { MapStyles } from './MapStyles';
import { getPosition } from 'utils/helpers/geoLocation';
import { isObjectWithValues } from 'utils/helpers/objects';

const s = classNames.bind(styles);

const STOCKHOLM = {
	lat: 59.363598,
	lng: 18.074851
};

const GoogleMaps = withScriptjs(
	withGoogleMap(({ selectedAddress, isMarkerShown, userPosition }) => (
		<GoogleMap
			defaultZoom={12}
			defaultCenter={{
				lat: path(['coords', 'latitude'], userPosition) || STOCKHOLM.lat,
				lng: path(['coords', 'longitude'], userPosition) || STOCKHOLM.lng
			}}
			center={{
				lat: path(['latitude'], selectedAddress) || path(['coords', 'latitude'], userPosition),
				lng: path(['longitude'], selectedAddress) || path(['coords', 'longitude'], userPosition)
			}}
			defaultOptions={{
				scrollwheel: false,
				styles: MapStyles,
				zoomControl: true,
				draggable: true,
				disableDefaultUI: true
			}}
		>
			{isMarkerShown && (
				<Marker
					position={{
						lat: path(['latitude'], selectedAddress),
						lng: path(['longitude'], selectedAddress)
					}}
					icon={null}
					// icon={{
					// 	url: myMarker, // pass your image here
					// 	scaledSize: { width: 70, height: 45 },
					// 	size: { width: 70, height: 45 }
					// }}
				/>
			)}
		</GoogleMap>
	))
);

class Map extends Component<Props, State> {
	constructor() {
		super();

		this.state = {
			userPosition: {}
		};
	}

	componentDidMount() {
		Promise.resolve(
			getPosition()
				.then(userPosition => {
					this.setState({
						userPosition
					});
				})
				.catch(err => {
					console.error(err.message);
				})
		);
	}

	render() {
		const { selectedAddress } = this.props;
		const { userPosition } = this.state;

		return (
			<div className={s('container')}>
				<GoogleMaps
					userPosition={userPosition}
					selectedAddress={selectedAddress}
					isMarkerShown={isObjectWithValues(selectedAddress)}
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC2vvL4RqLyLTIwBZ0xiIHXdvEiz7h_PJA&v=3.exp&libraries=geometry,drawing,places"
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `100%` }} />}
					mapElement={<div style={{ height: `100%` }} />}
				/>
			</div>
		);
	}
}

const mapStateToProps = ({ search }) => ({
	selectedAddress: search.selectedAddress
});

export default connect(mapStateToProps)(Map);
