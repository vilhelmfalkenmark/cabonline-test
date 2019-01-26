import { AddressEntity } from 'model/addressEntity';
import { VehiclesEntity } from 'model/vehiclesEntity';

export interface SearchStateEntity {
	searchTerm: string;
	fulfilled: boolean;
	fetching: boolean;
	rejected: boolean;
	errorMessage: any;
	selectedAddress: AddressEntity;
	data: AddressEntity[];
}

export interface VehiclesStateEntity {
	polling: string;
	fulfilled: boolean;
	fetching: boolean;
	rejected: boolean;
	errorMessage: any;
	data: VehiclesEntity[];
}

export interface ReduxStateEntity {
	vehicles: VehiclesStateEntity;
	search: SearchStateEntity;
}

export default '';
