export interface AddressEntity {
	id: number;
	type: string;
	zipCode: string;
	streetName: string;
	city: string;
	countryCode: string;
	latitude: number;
	longitude: number;
	hasStreetNumbers: boolean;
}
