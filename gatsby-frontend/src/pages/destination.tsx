import React, { FC } from 'react';
import { HeadFC, PageProps, graphql, useStaticQuery } from 'gatsby';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useQuery, gql } from '@apollo/client';

import Layout from '../components/layout';
import FavoriteButton from '../components/favorite-button';
import '../scss/main.scss';

const GET_DESTINATION_BY_ID = gql`
	query GetDestinationById($id: ID!) {
		destination(id: $id) {
			id
			title
			description
			detailed_description
			image
		}
	}
`;

const DestinationPage: FC<PageProps> = ({ location }) => {
	const requestedDestinationId = location.search.replace('?', '');

	const gatsbyData = useStaticQuery(graphql`
		query GetDestinationImages {
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

	const {
		loading,
		error,
		data: apolloData,
	} = useQuery(GET_DESTINATION_BY_ID, {
		variables: { id: requestedDestinationId },
	});

	if (loading) {
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
	}
	if (error) return <p>Error: {error.message}</p>;

	const destination = apolloData?.destination;

	if (!destination) {
		return (
			<Layout>
				<p className="text-center mt-5">
					Sorry, this destination could not be found.
				</p>
			</Layout>
		);
	}

	const gatsbyImage = getImage(
		gatsbyData.allFile.nodes.find(
			(node: any) => node.relativePath === destination.image
		)?.childImageSharp
	);

	return (
		<Container fluid id="root">
			<Layout>
				<Row className="align-items-center mb-4">
					<Col xs={12} md={8}>
						<h1 className="display-4">{destination.title}</h1>
						<p className="lead">{destination.description}</p>
					</Col>
					<Col xs={12} md={4} className="text-end">
						<FavoriteButton
							type="destination"
							itemId={destination.id}
							size="lg"
							className="me-2"
						/>
					</Col>
				</Row>
				<Row className="align-items-center">
					<Col xs={12} md={4}>
						<div className="ms-md-2 mt-2">
							<Card className="shadow-sm">
								<Card.Body>
									<Card.Title as="h2" className="mb-3">
										About this destination
									</Card.Title>
									<Card.Text>
										{destination.detailed_description}
									</Card.Text>
								</Card.Body>
							</Card>
						</div>
					</Col>
					<Col xs={12} md={8}>
						{gatsbyImage && (
							<GatsbyImage
								className="img-fluid rounded shadow-lg"
								image={gatsbyImage}
								alt={destination.title}
							/>
						)}
					</Col>
				</Row>
			</Layout>
		</Container>
	);
};

export default DestinationPage;

export const Head: HeadFC = () => <title>Destination Page</title>;
