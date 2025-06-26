import React, { FC } from 'react';
import { HeadFC, PageProps, graphql, useStaticQuery } from 'gatsby';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { GatsbyImage } from 'gatsby-plugin-image';

import Layout from '../components/layout';
import '../scss/main.scss';

const DestinationPage: FC<PageProps> = ({ location }) => {
	const requestedDestinationId = location.search.replace('?', '');
	const data = useStaticQuery(graphql`
		query {
			allDestinationDirect {
				nodes {
					id
					dbId
					title
					description
					detailed_description
					image
					coordinates {
						lat
						lng
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
	const destination = data.allDestinationDirect.nodes.find((td: any) => td.dbId.toString() === requestedDestinationId) || null;
	if (!destination) return null;
	const imageData = data.allFile;
	const image = imageData.edges.find(
		(edge: { node: { relativePath: string } }) => edge.node.relativePath === destination.image
	)?.node.childImageSharp.gatsbyImageData;
	return (
		<Container fluid id="root">
			<Layout>
				<Row>
					<Col xs={4}>
						<Row className="ms-2 mt-2">
							<Card>
								<Card.Body>
									<Card.Title>{destination.title}</Card.Title>
									<Card.Text>{destination.detailed_description}</Card.Text>
								</Card.Body>
							</Card>
						</Row>
					</Col>
					<Col xs={8}>
						<GatsbyImage
							className="img-fluid"
							image={image}
							alt={destination.title}
						/>
					</Col>
				</Row>
			</Layout>
		</Container>
	);
};

export default DestinationPage;

export const Head: HeadFC = () => <title>Destination Page</title>;
