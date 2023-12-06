export type Coordinates = {
	lat: number;
	lng: number;
};

export type Location = {
	id: number;
	title: string;
	description: string;
	coordinates: Coordinates;
	image: string;
};

export type Package = {
	price: number;
	info: string;
};

export type PricedPackages = {
	expensive: Package;
	moderate: Package;
	cheapest: Package;
};

export type Accommodation = Location & {
	packages: PricedPackages;
};

export type Destination = Location;

type Ratings = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export type Review = {
	name: string;
	age: number;
	review: string;
	rating: Ratings;
	image: string;
};
