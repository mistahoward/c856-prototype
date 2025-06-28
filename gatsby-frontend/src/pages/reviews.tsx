import React, { useState } from 'react';
import {
	Card,
	Col,
	Container,
	Row,
	Spinner,
	Alert,
	Modal,
	Button,
} from 'react-bootstrap';
import { HeadFC, graphql, useStaticQuery } from 'gatsby';
import { useQuery, gql, useMutation } from '@apollo/client';
import { getImage } from 'gatsby-plugin-image';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '../components/layout';
import '../scss/main.scss';
import ReviewCard from '../components/review-card';
import ReviewForm from '../components/review-form';
import RatingStars from '../components/rating-star';
import { Ratings } from '../types';
import { useAuth } from '../contexts/AuthContext';
import type { Review } from '../types';

const GET_REVIEWS = gql`
	query GetReviews {
		reviews {
			id
			name
			age
			review
			rating
			image
			date
			userId
			user {
				id
				firebaseId
				displayName
				photoURL
			}
		}
	}
`;

const DELETE_REVIEW = gql`
	mutation DeleteReview($id: ID!) {
		deleteReview(id: $id)
	}
`;

const MySwal = withReactContent(Swal);

/**
 * Main review page component that displays all reviews with functionality to add, edit, and delete reviews
 */
const ReviewPage = () => {
	const { currentUser } = useAuth();
	const [showReviewModal, setShowReviewModal] = useState(false);
	const [editReview, setEditReview] = useState<any | null>(null);
	const [deleteReview] = useMutation(DELETE_REVIEW);

	const gatsbyData = useStaticQuery(graphql`
		query GetReviewImages {
			allFile(filter: { sourceInstanceName: { eq: "images" } }) {
				nodes {
					relativePath
					childImageSharp {
						gatsbyImageData(layout: FULL_WIDTH)
					}
				}
			}
		}
	`);

	const { loading, error, data: apolloData, refetch } = useQuery(GET_REVIEWS);

	const imageMap = new Map();
	gatsbyData.allFile.nodes.forEach((node: any) => {
		imageMap.set(node.relativePath, getImage(node.childImageSharp));
	});

	if (loading)
		return (
			<Layout>
				<div
					className="d-flex justify-content-center align-items-center"
					style={{ height: '80vh' }}
				>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			</Layout>
		);

	if (error)
		return (
			<Layout>
				<p className="text-center mt-5">
					Error loading reviews: {error.message}
				</p>
			</Layout>
		);

	const averageRating =
		apolloData?.reviews.length > 0
			? (
					apolloData.reviews.reduce(
						(acc: number, review: { rating: number }) =>
							acc + review.rating,
						0
					) / apolloData.reviews.length
			  ).toFixed(1)
			: 0;

	const userReview =
		currentUser &&
		apolloData.reviews.find(
			(r: Review) => (r.user as any)?.firebaseId === currentUser.uid
		);

	console.log('currentUser:', currentUser);
	console.log(
		'reviews user objects:',
		apolloData?.reviews?.map((r: Review) => r.user)
	);

	/**
	 * Opens the review modal for adding a new review
	 * Resets the editReview state to null to indicate this is a new review
	 */
	const handleOpenAddReview = () => {
		setEditReview(null);
		setShowReviewModal(true);
	};

	/**
	 * Opens the review modal for editing an existing review
	 * Sets the editReview state to the current user's review
	 */
	const handleEditReview = () => {
		setEditReview(userReview);
		setShowReviewModal(true);
	};

	/**
	 * Closes the review modal and resets the editReview state
	 */
	const handleReviewModalClose = () => {
		setShowReviewModal(false);
		setEditReview(null);
	};

	/**
	 * Deletes a review after user confirmation
	 * Shows a confirmation dialog and handles the deletion process
	 * @param id - The ID of the review to delete
	 */
	const handleDeleteReview = async (id: string) => {
		const result = await MySwal.fire({
			title: 'Delete Review?',
			text: 'Are you sure you want to delete this review? This action cannot be undone.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'Cancel',
			confirmButtonColor: '#d33',
			focusCancel: true,
		});
		if (!result.isConfirmed) return;
		try {
			await deleteReview({ variables: { id } });
			refetch();
			MySwal.fire({
				title: 'Deleted!',
				text: 'The review has been deleted.',
				icon: 'success',
				timer: 1500,
				showConfirmButton: false,
			});
			toast.success('Review deleted successfully!');
		} catch (err) {
			MySwal.fire({
				title: 'Error',
				text: 'Failed to delete review.',
				icon: 'error',
			});
			toast.error('Failed to delete review.');
		}
	};

	const reviewCards = apolloData.reviews.map((review: any) => {
		const gatsbyImage = imageMap.get(review.image);
		return (
			<ReviewCard
				key={review.id}
				review={review}
				gatsbyImage={gatsbyImage}
				currentUser={currentUser}
				onDelete={handleDeleteReview}
			/>
		);
	});

	return (
		<Container id="root" fluid>
			<Layout>
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<Container className="mt-4">
					<Row align="start">
						<Col
							xs={12}
							md={3}
							className="average-ratings align-self-start"
						>
							<Card
								body
								className="position-sticky"
								style={{ top: '2rem' }}
							>
								<div className="text-center">
									<RatingStars
										rating={
											Number(averageRating) as Ratings
										}
										size="2x"
									/>
								</div>
								<div className="text-center">
									<h1>{averageRating}</h1>
									<h3>out of 5</h3>
									<h4>
										based on {apolloData.reviews.length}{' '}
										reviews
									</h4>
								</div>
								<div className="d-flex flex-column align-items-center mt-4">
									{currentUser ? (
										userReview ? (
											<Button
												variant="primary"
												onClick={handleEditReview}
											>
												Edit Review
											</Button>
										) : (
											<Button
												variant="primary"
												onClick={handleOpenAddReview}
											>
												Add Review
											</Button>
										)
									) : (
										<Button
											variant="outline-primary"
											href="/login"
										>
											Sign in to leave a review
										</Button>
									)}
								</div>
							</Card>
							<Modal
								show={showReviewModal}
								onHide={handleReviewModalClose}
								centered
							>
								<Modal.Header closeButton>
									<Modal.Title>
										{editReview
											? 'Edit Review'
											: 'Write a Review'}
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<ReviewForm
										onReviewSubmitted={
											handleReviewModalClose
										}
										initialReview={editReview || undefined}
									/>
								</Modal.Body>
							</Modal>
						</Col>
						<Col xs={12} md={9}>
							<div className="review-list-stack review-list-scrollable">
								{reviewCards}
							</div>
						</Col>
					</Row>
				</Container>
			</Layout>
		</Container>
	);
};

export default ReviewPage;

/**
 * Head component for the review page
 * Sets the page title for SEO purposes
 */
export const Head: HeadFC = () => <title>Review Page</title>;
