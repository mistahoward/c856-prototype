import React, { FC } from 'react';
import { HeadFC, PageProps, navigate } from 'gatsby';
import {
	Card, Col, Container, Row
} from 'react-bootstrap';
import { startCase } from 'lodash';
import currency from 'currency.js';
import tanitiAccommodations from '../data/accommodations';
import Layout from '../components/layout';

import '../scss/main.scss';

const AccommodationPage: FC<PageProps> = ({ location }) => {
	const requestedAccommodationId = location.search.replace('?', '');
	const accommodation = tanitiAccommodations.find(
		(ta) => ta.id.toString() === requestedAccommodationId
	);
	const accommodationExists = !!accommodation;
	if (!accommodationExists) {
		navigate('/404');
		return null;
	}

	const accommodationTitles = Object.keys(accommodation.packages);
	const accommodationCards = Object.values(accommodation.packages).map((ap, index) => (
		<Col xs={12} className="justify-content-center mt-2">
			<Card>
				<Card.Body>
					<Card.Title>{startCase(accommodationTitles[index])}</Card.Title>
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
						<img
							className="img-fluid"
							src={accommodation.image}
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
