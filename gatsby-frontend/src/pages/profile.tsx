import React, { FC } from 'react';
import { HeadFC } from 'gatsby';
import {
	Container,
	Row,
	Col,
	Card,
	Spinner,
	Alert,
	Button,
} from 'react-bootstrap';
import { useQuery, gql, useMutation } from '@apollo/client';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHeart,
	faTrash,
	faDownload,
	faPlane,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import Layout from '../components/layout';
import { useAuth } from '../contexts/AuthContext';
import '../scss/main.scss';

const GET_CURRENT_USER_FAVORITES = gql`
	query GetCurrentUserFavorites {
		currentUser {
			id
			displayName
			email
			photoURL
			favorites {
				id
				type
				itemId
				accommodation {
					id
					title
					description
					image
					packages {
						expensive {
							price
						}
						moderate {
							price
						}
						cheapest {
							price
						}
					}
				}
				destination {
					id
					title
					description
					image
					detailed_description
				}
			}
		}
	}
`;

const REMOVE_FAVORITE = gql`
	mutation RemoveFavorite($userId: ID!, $type: String!, $itemId: String!) {
		removeFavorite(userId: $userId, type: $type, itemId: $itemId) {
			id
		}
	}
`;

const ProfilePage: FC = () => {
	const { currentUser } = useAuth();
	const { loading, error, data, refetch } = useQuery(
		GET_CURRENT_USER_FAVORITES,
		{
			skip: !currentUser,
		}
	);
	const [removeFavorite] = useMutation(REMOVE_FAVORITE);
	const gatsbyData = useStaticQuery(graphql`
		query GetProfileImages {
			allFile(filter: { sourceInstanceName: { eq: "images" } }) {
				nodes {
					relativePath
					childImageSharp {
						gatsbyImageData(
							layout: FULL_WIDTH
							placeholder: BLURRED
						)
					}
				}
			}
		}
	`);

	if (!currentUser)
		return (
			<Layout>
				<Container>
					<Alert variant="warning" className="text-center">
						<Alert.Heading>Authentication Required</Alert.Heading>
						<p>
							Please sign in to view your profile and favorites.
						</p>
						<Button href="/login" variant="primary">
							Sign In
						</Button>
					</Alert>
				</Container>
			</Layout>
		);

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
				<Container>
					<Alert variant="danger">
						Error loading profile: {error.message}
					</Alert>
				</Container>
			</Layout>
		);

	const user = data?.currentUser;
	const favorites = user?.favorites || [];

	const accommodationFavorites = favorites.filter(
		(fav: any) => fav.type === 'accommodation' && fav.accommodation
	);
	const destinationFavorites = favorites.filter(
		(fav: any) => fav.type === 'destination' && fav.destination
	);

	const handleRemoveFavorite = async (
		favoriteId: string,
		type: string,
		itemId: string
	) => {
		try {
			const userId = data?.currentUser?.id;
			if (!userId) {
				console.error('No user ID available');
				return;
			}

			await removeFavorite({
				variables: {
					userId,
					type,
					itemId,
				},
			});
			refetch();
			toast.success('Favorite removed successfully!');
		} catch (error) {
			console.error('Error removing favorite:', error);
			toast.error('Error removing favorite. Please try again later.');
		}
	};

	const exportFavoritesToCSV = () => {
		if (!favorites || favorites.length === 0) {
			alert('No favorites to export!');
			return;
		}

		const now = new Date();
		const timestamp = now.toLocaleString();
		const dateStr = now.toISOString().split('T')[0];

		const csvContent = [
			`"Tropical Taniti - My Dream Vacation Favorites"`,
			`"Generated on: ${timestamp}"`,
			`"User: ${currentUser.displayName || currentUser.email}"`,
			`""`,
			`"Type","Title","Description","Price Range","Added Date"`,
		];

		accommodationFavorites.forEach((favorite: any) => {
			const item = favorite.accommodation;

			const prices = [
				item.packages?.expensive?.price,
				item.packages?.moderate?.price,
				item.packages?.cheapest?.price,
			].filter(price => price && price > 0);

			let priceRange = 'N/A';
			if (prices.length > 0) {
				const minPrice = Math.min(...prices);
				const maxPrice = Math.max(...prices);
				priceRange =
					minPrice === maxPrice
						? `$${minPrice}`
						: `$${minPrice} - $${maxPrice}`;
			}

			csvContent.push(
				`"Accommodation","${item.title.replace(
					/"/g,
					'""'
				)}","${item.description.replace(
					/"/g,
					'""'
				)}","${priceRange}","${dateStr}"`
			);
		});

		destinationFavorites.forEach((favorite: any) => {
			const item = favorite.destination;
			csvContent.push(
				`"Destination","${item.title.replace(
					/"/g,
					'""'
				)}","${item.description.replace(
					/"/g,
					'""'
				)}","N/A","${dateStr}"`
			);
		});

		csvContent.push(`""`);
		csvContent.push(`"Summary"`);
		csvContent.push(
			`"Total Accommodations","${accommodationFavorites.length}"`
		);
		csvContent.push(
			`"Total Destinations","${destinationFavorites.length}"`
		);
		csvContent.push(`"Total Favorites","${favorites.length}"`);

		const blob = new Blob([csvContent.join('\n')], {
			type: 'text/csv;charset=utf-8;',
		});
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute(
			'download',
			`tropical-taniti-favorites-${dateStr}.csv`
		);
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<Container fluid id="root">
			<Layout>
				<div className="profile-content">
					<Row className="mb-5">
						<Col xs={12} md={4}>
							<Card className="profile-card">
								<Card.Body>
									{currentUser.photoURL ? (
										<img
											src={currentUser.photoURL}
											alt={
												currentUser.displayName ||
												'Profile'
											}
											className="profile-avatar"
										/>
									) : (
										<div
											className="profile-avatar d-flex align-items-center justify-content-center mb-3"
											style={{
												backgroundColor: '#f8f9fa',
												fontSize: '3rem',
											}}
										>
											{currentUser.displayName?.charAt(
												0
											) ||
												currentUser.email?.charAt(0) ||
												'U'}
										</div>
									)}
									<Card.Title
										style={{
											fontWeight: 700,
											fontSize: '1.5rem',
										}}
									>
										{currentUser.displayName || 'User'}
									</Card.Title>
									<Card.Text
										className="text-muted"
										style={{ fontSize: '1rem' }}
									>
										{currentUser.email}
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} md={8}>
							<Card className="profile-card">
								<Card.Body>
									<Card.Title className="d-flex justify-content-between align-items-center mb-4">
										<span>Your Favorites</span>
										{favorites.length > 0 && (
											<Button
												variant="primary"
												size="sm"
												onClick={exportFavoritesToCSV}
												className="export-btn"
											>
												<FontAwesomeIcon
													icon={faDownload}
												/>
												<FontAwesomeIcon
													icon={faPlane}
												/>
												Export for My Trip
											</Button>
										)}
									</Card.Title>
									<Row>
										<Col xs={6}>
											<div className="text-center">
												<h3
													style={{
														color: 'var(--bs-primary)',
														fontWeight: 700,
														fontSize: '2.2rem',
													}}
												>
													{
														accommodationFavorites.length
													}
												</h3>
												<p className="text-muted">
													Accommodations
												</p>
											</div>
										</Col>
										<Col xs={6}>
											<div className="text-center">
												<h3
													style={{
														color: 'var(--bs-primary)',
														fontWeight: 700,
														fontSize: '2.2rem',
													}}
												>
													{
														destinationFavorites.length
													}
												</h3>
												<p className="text-muted">
													Destinations
												</p>
											</div>
										</Col>
									</Row>
									{favorites.length > 0 && (
										<Row className="mt-3">
											<Col xs={12}>
												<small className="text-muted">
													💡 Export your favorites as
													a CSV report to plan your
													perfect Tropical Taniti
													vacation!
												</small>
											</Col>
										</Row>
									)}
								</Card.Body>
							</Card>
						</Col>
					</Row>

					{accommodationFavorites.length > 0 && (
						<Row className="mb-4 justify-content-center">
							<Col xs={12}>
								<h2 className="section-header">
									Favorite Accommodations
								</h2>
								<Row className="justify-content-center">
									{accommodationFavorites.map(
										(favorite: any) => {
											const item = favorite.accommodation;
											const gatsbyImage = imageMap.get(
												item.image
											);

											return (
												<Col
													xs={12}
													md={6}
													lg={4}
													key={favorite.id}
													className="mb-3 d-flex justify-content-center"
												>
													<Card className="favorite-card h-100 w-100">
														{gatsbyImage && (
															<GatsbyImage
																image={
																	gatsbyImage
																}
																alt={item.title}
																className="card-img-top"
																style={{
																	height: 200,
																	objectFit:
																		'cover',
																	borderTopLeftRadius: 14,
																	borderTopRightRadius: 14,
																}}
															/>
														)}
														<Card.Body>
															<Card.Title>
																{item.title}
															</Card.Title>
															<Card.Text>
																{
																	item.description
																}
															</Card.Text>
															<div className="d-flex justify-content-between align-items-center">
																<small className="text-muted">
																	From $
																	{Math.min(
																		item
																			.packages
																			.expensive
																			.price,
																		item
																			.packages
																			.moderate
																			.price,
																		item
																			.packages
																			.cheapest
																			.price
																	)}
																</small>
																<Button
																	variant="outline-danger"
																	size="sm"
																	onClick={() =>
																		handleRemoveFavorite(
																			favorite.id,
																			'accommodation',
																			item.id
																		)
																	}
																>
																	<FontAwesomeIcon
																		icon={
																			faTrash
																		}
																	/>
																</Button>
															</div>
														</Card.Body>
													</Card>
												</Col>
											);
										}
									)}
								</Row>
							</Col>
						</Row>
					)}

					{destinationFavorites.length > 0 && (
						<Row className="mb-4 justify-content-center">
							<Col xs={12}>
								<h2 className="section-header">
									Favorite Destinations
								</h2>
								<Row className="justify-content-center">
									{destinationFavorites.map(
										(favorite: any) => {
											const item = favorite.destination;
											const gatsbyImage = imageMap.get(
												item.image
											);

											return (
												<Col
													xs={12}
													md={6}
													lg={4}
													key={favorite.id}
													className="mb-3 d-flex justify-content-center"
												>
													<Card className="favorite-card h-100 w-100">
														{gatsbyImage && (
															<GatsbyImage
																image={
																	gatsbyImage
																}
																alt={item.title}
																className="card-img-top"
																style={{
																	height: 200,
																	objectFit:
																		'cover',
																	borderTopLeftRadius: 14,
																	borderTopRightRadius: 14,
																}}
															/>
														)}
														<Card.Body>
															<Card.Title>
																{item.title}
															</Card.Title>
															<Card.Text>
																{
																	item.description
																}
															</Card.Text>
															<div className="d-flex justify-content-between align-items-center">
																<Button
																	variant="outline-primary"
																	size="sm"
																	href={`/destination?${item.id}`}
																>
																	View Details
																</Button>
																<Button
																	variant="outline-danger"
																	size="sm"
																	onClick={() =>
																		handleRemoveFavorite(
																			favorite.id,
																			'destination',
																			item.id
																		)
																	}
																>
																	<FontAwesomeIcon
																		icon={
																			faTrash
																		}
																	/>
																</Button>
															</div>
														</Card.Body>
													</Card>
												</Col>
											);
										}
									)}
								</Row>
							</Col>
						</Row>
					)}

					{favorites.length === 0 && (
						<Row>
							<Col xs={12}>
								<Card
									className="profile-card text-center"
									style={{
										background: '#fff',
										border: '1px solid #f0e6c6',
										borderRadius: 18,
									}}
								>
									<Card.Body>
										<FontAwesomeIcon
											icon={faHeart}
											size="3x"
											className="text-muted mb-3"
										/>
										<Card.Title>
											No favorites yet
										</Card.Title>
										<Card.Text>
											Start exploring accommodations and
											destinations to save your favorites!
										</Card.Text>
										<div>
											<Button
												href="/accommodations"
												variant="primary"
												className="me-2"
											>
												Browse Accommodations
											</Button>
											<Button
												href="/destinations"
												variant="outline-primary"
											>
												Explore Destinations
											</Button>
										</div>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					)}
				</div>
			</Layout>
		</Container>
	);
};

export default ProfilePage;

export const Head: HeadFC = () => <title>Profile - Tropical Taniti</title>;
