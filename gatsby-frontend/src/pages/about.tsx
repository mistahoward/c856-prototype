import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { HeadFC } from 'gatsby';

import Layout from '../components/layout';
import '../scss/main.scss';

const AboutPage = () => (
	<Container id="root" fluid>
		<Layout>
			<Card>
				<Card.Body>
					<Card.Title>About Taniti</Card.Title>
					<Card.Text>
						Discover Taniti, a vibrant mosaic of culture and nature nestled in the
						Pacific. Spanning a diverse terrain of tropical rainforests, pristine
						beaches, and a gentle volcano, this small island paradise offers a unique
						blend of adventure and tranquility. With a rich heritage rooted in fishing
						and agriculture, Taniti has flourished into a haven for explorers and
						foodies alike, boasting a variety of local and international cuisines.
						Accommodations range from cozy bed and breakfasts to luxurious resorts,
						ensuring comfort for every traveler. Whether you&apos;re here to soak up the
						sun on sandy shores, delve into the lush wilderness, or immerse yourself in
						local life, Taniti promises an escape that&apos;s as enchanting as it is
						unforgettable.
					</Card.Text>
				</Card.Body>
			</Card>
		</Layout>
	</Container>
);

export default AboutPage;

export const Head: HeadFC = () => <title>About Page</title>;
