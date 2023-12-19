import React, { FC } from 'react';
import { HeadFC, PageProps, graphql, useStaticQuery } from 'gatsby';
import {
	Card, Col, Container, Row
} from 'react-bootstrap';
import { startCase } from 'lodash';
import currency from 'currency.js';
import { GatsbyImage } from 'gatsby-plugin-image';

import tanitiAccommodations from '../data/accommodations';
import Layout from '../components/layout';

import '../scss/main.scss';

const AccommodationPage: FC<PageProps> = ({ location }) => {
	const requestedAccommodationId = location.search.replace('?', '');
	const accommodation = tanitiAccommodations.find(
		(ta) => ta.id.toString() === requestedAccommodationId
	);
	const accommodationExists = !!accommodation;
	if (!accommodationExists) return null;
	const imageData = useStaticQuery(graphql`
		query {
			allFile(filter: { sourceInstanceName: { eq: "images" } }) {
				edges {
					node {
						childImageSharp {
							gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
						}
						relativePath
					}
				}
			}
		}
	`);
	const image = imageData.allFile.edges.find(
		(edge: { node: { relativePath: string; }; }) => edge.node.relativePath === accommodation.image
	)?.node.childImageSharp.gatsbyImageData;

	const accommodationTitles = Object.keys(accommodation.packages);
	const accommodationCards = Object.values(accommodation.packages).map((ap, index) => (
		<Col xs={12} className="justify-content-center mt-2">
			<Card>
				<Card.Body>
					<Card.Title>
						{startCase(accommodationTitles[index])}
						&nbsp;Package
					</Card.Title>
					<Card.Text>{ap.info}</Card.Text>
					<Card.Text className="text-muted">{currency(ap.price).format()}</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	));
	return (
		<Container fluid id="root">
			<Layout>
				<Row>
					<Col xs={4}>
						<Row className="ms-2">{accommodationCards}</Row>
					</Col>
					<Col xs={8}>
						<GatsbyImage
							imgClassName="img-fluid"
							image={image}
							alt={accommodation.title}
						/>
					</Col>
				</Row>
			</Layout>
		</Container>
	);
};

export default AccommodationPage;

export const Head: HeadFC = () => <title>Accommodation Page</title>;
