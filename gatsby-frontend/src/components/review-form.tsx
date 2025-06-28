import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useMutation, gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import { Ratings } from '../types';
import '../scss/main.scss';

const CREATE_REVIEW = gql`
	mutation CreateReview($input: CreateReviewInput!) {
		createReview(input: $input) {
			id
			review
			rating
			date
			user {
				id
				displayName
				photoURL
			}
		}
	}
`;

const UPDATE_REVIEW = gql`
	mutation UpdateReview($id: ID!, $input: UpdateReviewInput!) {
		updateReview(id: $id, input: $input) {
			id
			review
			rating
			date
			user {
				id
				displayName
				photoURL
			}
		}
	}
`;

interface ReviewFormProps {
	onReviewSubmitted?: () => void;
	initialReview?: {
		id: string;
		review: string;
		rating: number;
	};
}

const ReviewForm: React.FC<ReviewFormProps> = ({
	onReviewSubmitted,
	initialReview,
}) => {
	const [review, setReview] = useState(initialReview?.review || '');
	const [rating, setRating] = useState<Ratings>(
		initialReview ? (initialReview.rating as Ratings) : 0
	);
	const [hoveredRating, setHoveredRating] = useState<Ratings>(0);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [createReview] = useMutation(CREATE_REVIEW, {
		refetchQueries: ['GetReviews'],
		onCompleted: () => {
			setReview('');
			setRating(0);
			setIsSubmitting(false);
			onReviewSubmitted?.();
			toast.success('Review added successfully!');
		},
		onError: error => {
			console.error('Error creating review:', error);
			setIsSubmitting(false);
			toast.error('Failed to add review.');
		},
	});

	const [updateReview] = useMutation(UPDATE_REVIEW, {
		refetchQueries: ['GetReviews'],
		onCompleted: () => {
			setIsSubmitting(false);
			onReviewSubmitted?.();
			toast.success('Review updated successfully!');
		},
		onError: error => {
			console.error('Error updating review:', error);
			setIsSubmitting(false);
			toast.error('Failed to update review.');
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!review.trim() || rating === 0) return;

		setIsSubmitting(true);
		try {
			if (initialReview) {
				await updateReview({
					variables: {
						id: initialReview.id,
						input: { review: review.trim(), rating },
					},
				});
			} else {
				await createReview({
					variables: {
						input: {
							review: review.trim(),
							rating,
						},
					},
				});
			}
		} catch (error) {
			console.error('Error submitting review:', error);
			setIsSubmitting(false);
		}
	};

	const renderStars = () => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			const starValue = i as Ratings;
			const isFilled = hoveredRating >= starValue || rating >= starValue;

			stars.push(
				<FontAwesomeIcon
					key={i}
					icon={faStar}
					className={`star-rating ${isFilled ? 'filled' : ''}`}
					onClick={() => setRating(starValue)}
					onMouseEnter={() => setHoveredRating(starValue)}
					onMouseLeave={() => setHoveredRating(0)}
					style={{
						cursor: 'pointer',
						fontSize: '1.5rem',
						margin: '0 2px',
						color: isFilled ? '#ffc107' : '#e4e5e9',
					}}
				/>
			);
		}
		return stars;
	};

	return (
		<Card className="mb-4">
			<Card.Body>
				<Card.Title>Write a Review</Card.Title>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col xs={12}>
							<Form.Group className="mb-3">
								<Form.Label>Your Rating</Form.Label>
								<div className="d-flex align-items-center">
									{renderStars()}
									<span className="ms-2">
										{rating > 0
											? `${rating} out of 5`
											: 'Click to rate'}
									</span>
								</div>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<Form.Group className="mb-3">
								<Form.Label>Your Review</Form.Label>
								<Form.Control
									as="textarea"
									rows={4}
									value={review}
									onChange={e => setReview(e.target.value)}
									placeholder="Share your experience on the island..."
									required
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<Button
								type="submit"
								variant="primary"
								disabled={
									!review.trim() ||
									rating === 0 ||
									isSubmitting
								}
							>
								{isSubmitting
									? initialReview
										? 'Updating...'
										: 'Submitting...'
									: initialReview
									? 'Update Review'
									: 'Submit Review'}
							</Button>
						</Col>
					</Row>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default ReviewForm;
