export type Coordinates = {
	lat: number;
	lng: number;
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

export type Accommodation = {
	title: string;
	description: string;
	coordinates: Coordinates;
	packages: PricedPackages;
};

export type Destination = {
	title: string;
	description: string;
	coordinates: Coordinates;
};

type Ratings = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export type Review = {
	name: string;
	age: number;
	review: string;
	rating: Ratings;
};
