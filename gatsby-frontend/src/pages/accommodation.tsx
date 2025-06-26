import React, { FC } from 'react';
import { HeadFC, PageProps, graphql, useStaticQuery } from 'gatsby';
import {
	Card, Col, Container, Row
} from 'react-bootstrap';
import { startCase } from 'lodash';
import currency from 'currency.js';
import { GatsbyImage } from 'gatsby-plugin-image';

import Layout from '../components/layout';
import '../scss/main.scss';

const AccommodationPage: FC<PageProps> = ({ location }) => {
	const requestedAccommodationId = location.search.replace('?', '');
	const data = useStaticQuery(graphql`
		query {
			allAccommodationDirect {
				nodes {
					id
					dbId
					title
					description
					image
					link
					coordinates {
						lat
						lng
					}
					packages {
						expensive { price info }
						moderate { price info }
						cheapest { price info }
					}
				}
			}
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
	const accommodation = data.allAccommodationDirect.nodes.find((ta: any) => ta.dbId.toString() === requestedAccommodationId) || null;
	if (!accommodation) return null;
	const imageData = data.allFile;
	const image = imageData.edges.find(
		(edge: { node: { relativePath: string } }) => edge.node.relativePath === accommodation.image
	)?.node.childImageSharp.gatsbyImageData;
	const packages = accommodation.packages;
	const accommodationTitles = Object.keys(packages);
	const accommodationCards = Object.values(packages).map((ap: any, index) => (
		<Col xs={12} className="justify-content-center mt-2" key={index}>
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
