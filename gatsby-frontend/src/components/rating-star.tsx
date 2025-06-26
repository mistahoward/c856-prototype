import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar, faStarHalfStroke as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import type { RatingStarProps } from './types';
import { Placeholder } from 'react-bootstrap';

const RatingStars = ({ rating, size }: RatingStarProps) => {
	const [isMounted, setIsMounted] = useState(false);
	const fullStarsCount = Math.floor(rating);
	const halfStarsCount = rating % 1 >= 0.5 ? 1 : 0;
	const emptyStarsCount = 5 - fullStarsCount - halfStarsCount;

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return (
			<Placeholder animation="glow">
				<Placeholder xs={2} className="me-1" />
				<Placeholder xs={2} className="me-1" />
				<Placeholder xs={2} className="me-1" />
				<Placeholder xs={2} className="me-1" />
				<Placeholder xs={2} className="me-1" />
			</Placeholder>
		);
	}

	const fullStars = Array.from({ length: fullStarsCount }, (_, index) => (
		<FontAwesomeIcon size={size} icon={fullStar} key={`full-${index}`} />
	));

	const halfStars = halfStarsCount ? [<FontAwesomeIcon size={size} icon={halfStar} key="half" />] : [];

	const emptyStars = Array.from({ length: emptyStarsCount }, (_, index) => (
		<FontAwesomeIcon size={size} icon={emptyStar} key={`empty-${index}`} />
	));

	return <div>{[...fullStars, ...halfStars, ...emptyStars]}</div>;
};

export default RatingStars;
