import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { Location, Ratings, Review } from '../types';

export type MapContainerProps = {
	locations: Location[];
	type: 'accommodation' | 'destination';
};

export type MarkerListProps = {
	map: any;
	locations: Location[];
	title?: string;
	openPopup: (index: number) => void;
};

export type ReviewCardProps = {
	review: Review;
};

export type RatingStarProps = {
	rating: Ratings;
	size?: SizeProp;
};
