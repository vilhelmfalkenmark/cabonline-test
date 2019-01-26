import React, { Component } from 'react';
import { connect } from 'react-redux';
import { path } from 'ramda';
import classNames from 'classnames/bind';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

import styles from './Map.scss';
import { MapStyles } from './MapStyles';
import { getPosition } from 'utils/helpers/geoLocation';
import { isObjectWithValues } from 'utils/helpers/objects';
import { IAddressEntity } from 'model/IAddressEntity';
import { getVehiclesPositions } from 'utils/selectors/vehicles';

const s = classNames.bind(styles);

const STOCKHOLM = {
	lat: 59.363598,
	lng: 18.074851
};

const GoogleMaps = withScriptjs(
	withGoogleMap(({ selectedAddress, isMarkerShown, userPosition, vehiclesPositions }) => (
		<GoogleMap
			defaultZoom={12}
			defaultCenter={{
				lat: userPosition ? path(['coords', 'latitude'], userPosition) : STOCKHOLM.lat,
				lng: userPosition ? path(['coords', 'longitude'], userPosition) : STOCKHOLM.lng
			}}
			center={{
				lat: path(['latitude'], selectedAddress) || path(['coords', 'latitude'], userPosition),
				lng: path(['longitude'], selectedAddress) || path(['coords', 'longitude'], userPosition)
			}}
			zoom={vehiclesPositions ? 15 : 12}
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
				/>
			)}
			{vehiclesPositions && (
				<MarkerClusterer gridSize={60} minimumClusterSize={40}>
					{vehiclesPositions.map(vehiclePosition => (
						<Marker
							key={`${vehiclePosition.lat}-${vehiclePosition.lng}`}
							position={{ lat: vehiclePosition.lat, lng: vehiclePosition.lng }}
							icon={{
								url: '/static/taxi.png',
								scaledSize: { width: 100, height: 31 },
								size: { width: 200, height: 73 }
							}}
						/>
					))}
				</MarkerClusterer>
			)}
		</GoogleMap>
	))
);

interface IProps {
	selectedAddress: IAddressEntity;
}

interface IState {
	userPosition: any; // FIX
}

class Map extends Component<IProps, IState> {
	constructor() {
		super();

		this.state = {
			userPosition: {}
		};
	}

	public componentDidMount() {
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

	public render() {
		const { selectedAddress, vehicles } = this.props;
		const { userPosition } = this.state;

		return (
			<div className={s('container')}>
				<GoogleMaps
					userPosition={isObjectWithValues(userPosition) ? userPosition : null}
					vehiclesPositions={getVehiclesPositions(vehicles)}
					selectedAddress={selectedAddress}
					isMarkerShown={isObjectWithValues(selectedAddress)}
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC2vvL4RqLyLTIwBZ0xiIHXdvEiz7h_PJA&v=3.exp&libraries=geometry,drawing,places" /* tslint:disable-line */
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `100%` }} />}
					mapElement={<div style={{ height: `100%` }} />}
				/>
			</div>
		);
	}
}

const mapStateToProps = ({ search, vehicles }) => ({
	selectedAddress: search.selectedAddress,
	vehicles
});

export default connect(mapStateToProps)(Map);
