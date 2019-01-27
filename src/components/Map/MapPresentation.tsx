import React from 'react';
import { path } from 'ramda';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';

import { VehiclesEntity } from 'model/vehiclesEntity';
import { AddressEntity } from 'model/addressEntity';
import { UserPositionEntity } from 'model/positionEntitity';
import { MapStyles } from './MapStyles';

const { mapDefaultCenter } = require('utils/config');

interface Props {
	selectedAddress: AddressEntity;
	isMarkerShown: boolean;
	userPosition: UserPositionEntity;
	vehiclesPositions: VehiclesEntity[];
}

const MapPresentation: React.FunctionComponent<Props> = ({
	selectedAddress,
	isMarkerShown,
	userPosition,
	vehiclesPositions
}) => (
	<GoogleMap
		defaultZoom={15}
		defaultCenter={{
			lat: userPosition ? path(['coords', 'latitude'], userPosition) : mapDefaultCenter.lat,
			lng: userPosition ? path(['coords', 'longitude'], userPosition) : mapDefaultCenter.lng
		}}
		center={{
			lat:
				path(['latitude'], selectedAddress) ||
				path(['coords', 'latitude'], userPosition) ||
				mapDefaultCenter.lat,
			lng:
				path(['longitude'], selectedAddress) ||
				path(['coords', 'longitude'], userPosition) ||
				mapDefaultCenter.lng
		}}
		zoom={15}
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
);

export default withScriptjs(withGoogleMap(MapPresentation));
