export interface VehiclesPositionEntity {
	lng: number;
	lat: number;
}

export interface CoordinatesEntity {
	latitude: number;
	longitude: number;
}

export interface UserPositionEntity {
	coords: CoordinatesEntity;
}
