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
	link: string;
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

export type Destination = Location & {
	detailed_description: string;
};

export type Ratings = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export type User = {
	id: string;
	firebaseId: string;
	email: string;
	displayName?: string;
	photoURL?: string;
	createdAt: string;
	updatedAt: string;
};

export type Review = {
	id: string;
	user?: User;
	userId?: string;
	name?: string;
	age?: number;
	review: string;
	rating: Ratings;
	image?: string;
	date: EpochTimeStamp;
};
