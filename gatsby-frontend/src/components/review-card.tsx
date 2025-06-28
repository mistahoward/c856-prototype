import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import type { ReviewCardProps } from './types';

import '../scss/main.scss';
import RatingStars from './rating-star';

declare type EpochTimeStamp = number;
const epochToReadableDate = (epoch: EpochTimeStamp) => {
	const date = new Date(epoch);
	return date.toLocaleDateString('en-US', {
		month: 'long',
		day: '2-digit',
		year: 'numeric',
	});
};

const ReviewCard = ({
	review,
	gatsbyImage,
	currentUser,
	onDelete,
}: ReviewCardProps) => {
	const displayName = review.user?.displayName || review.name || 'Anonymous';
	const displayImage = review.user?.photoURL || review.image;
	const isUserReview = !!review.user;

	// const isSuperAdmin = currentUser?.email === 'alexandersbeard@gmail.com';
	const isSuperAdmin = false;
	const isOwnReview =
		currentUser &&
		review.user &&
		review.user.firebaseId === currentUser.uid;
	const canDelete = isSuperAdmin || isOwnReview;

	console.log('ReviewCard currentUser:', currentUser);
	console.log('ReviewCard review.user:', review.user);

	return (
		<div className="review-row d-flex align-items-start py-4 border-bottom position-relative">
			{canDelete && (
				<button
					type="button"
					className="btn btn-link p-0 position-absolute review-delete-btn"
					style={{ top: 10, right: 0 }}
					onClick={() => onDelete && onDelete(review.id)}
					title="Delete review"
				>
					<FontAwesomeIcon icon={faTrash} size="lg" color="#d9534f" />
				</button>
			)}
			{displayImage && (
				<span className="review-avatar me-4">
					{isUserReview ? (
						<img
							src={displayImage}
							alt={displayName}
							className="avatar"
							style={{
								width: 60,
								height: 60,
								borderRadius: '50%',
								objectFit: 'cover',
							}}
						/>
					) : (
						gatsbyImage && (
							<GatsbyImage
								imgClassName="avatar"
								image={gatsbyImage}
								alt={displayName}
								style={{
									width: 60,
									height: 60,
									borderRadius: '50%',
								}}
							/>
						)
					)}
				</span>
			)}
			<div className="review-content flex-grow-1">
				<div className="d-flex align-items-center mb-1">
					<strong className="review-name me-2">{displayName}</strong>
					{isUserReview && (
						<small className="text-muted ms-2">Verified User</small>
					)}
				</div>
				<p className="mb-2">&quot;{review.review}&quot;</p>
				<div className="d-flex align-items-center mb-1">
					<RatingStars rating={review.rating} />
					<em className="text-muted ms-3">
						{epochToReadableDate(review.date)}
					</em>
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;
