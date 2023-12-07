import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import type { ReviewCardProps } from './types';

import '../scss/main.scss';
import RatingStars from './rating-star';
import { epochToReadableDate } from '../data/reviews';

const ReviewCard = ({ review }: ReviewCardProps) => (
	<Col xs={6}>
		<Card className="mt-2">
			<Card.Body>
				<Row>
					<Col className="text-center">
						<img className="avatar" src={review.image} alt={review.name} />
					</Col>
				</Row>
				<Row>
					<Col className="text-center">
						<h5 className="display-6">{review.name}</h5>
						<h6>
							{review.age}
							&nbsp;years old
						</h6>
					</Col>
				</Row>
				<Row>
					<Col className="text-center">
						<p>
							&quot;
							{review.review}
							&quot;
						</p>
					</Col>
				</Row>
				<Row>
					<Col className="text-center">
						<p>
							<RatingStars rating={review.rating} />
						</p>
					</Col>
				</Row>
				<Row>
					<Col className="text-center text-muted">
						<p>
							<em>
								{epochToReadableDate(review.date)}
							</em>
						</p>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	</Col>
);

export default ReviewCard;
