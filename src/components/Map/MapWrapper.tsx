import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './Map.scss';
import { getPosition } from 'utils/helpers/geoLocation';
import { isObjectWithValues } from 'utils/helpers/objects';
import { AddressEntity } from 'model/addressEntity';
import { UserPositionEntity } from 'model/positionEntitity';
import { VehiclesStateEntity } from 'model/reduxStateEntity';
import { getVehiclesPositions } from 'utils/selectors/vehicles';
import MapPresentation from 'components/Map/MapPresentation';

const s = classNames.bind(styles);

interface Props {
	selectedAddress: AddressEntity;
	vehicles: VehiclesStateEntity;
}

interface State {
	userPosition: UserPositionEntity;
}

class MapWrapper extends Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			userPosition: {
				coords: {
					latitude: null,
					longitude: null
				}
			}
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
				<MapPresentation
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

export default connect(mapStateToProps)(MapWrapper);
