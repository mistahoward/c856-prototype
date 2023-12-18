import React, { FC } from 'react';
import { HeadFC, PageProps } from 'gatsby';
import { Card, Col, Container, Row } from 'react-bootstrap';

import tanitiDestinations from '../data/destinations';
import Layout from '../components/layout';

import '../scss/main.scss';

const DestinationPage: FC<PageProps> = ({ location }) => {
	const requestedDestinationId = location.search.replace('?', '');
	const destination = tanitiDestinations.find(
		(td) => td.id.toString() === requestedDestinationId
	);
	const destinationExists = !!destination;
	if (!destinationExists) return null;
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
						<img
							className="img-fluid"
							src={destination.image}
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
