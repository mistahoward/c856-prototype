import type { ReactNode } from 'react';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

import { Location, Ratings, Review } from '../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';

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
	gatsbyImage: IGatsbyImageData;
};

export type RatingStarProps = {
	rating: Ratings;
	size?: SizeProp;
};

export type LayoutProps = {
	children: ReactNode;
};
