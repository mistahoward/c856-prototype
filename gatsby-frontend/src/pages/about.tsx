import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { StaticImage } from 'gatsby-plugin-image';
import { HeadFC } from 'gatsby';

import Layout from '../components/layout';
import '../scss/main.scss';

const AboutPage = () => (
	<Container id="root" fluid>
		<Layout>
			<div style={{ maxWidth: 800, margin: '2rem auto' }}>
				<Card
					className="favorite-card"
					style={{ background: '#fffbe6', border: 'none' }}
				>
					<StaticImage
						src="../images/carousel_1.jpg"
						alt="Taniti Scenic"
						style={{
							maxHeight: 280,
							objectFit: 'cover',
							borderRadius: '14px 14px 0 0',
							width: '100%',
						}}
						imgStyle={{
							borderRadius: '14px 14px 0 0',
							objectFit: 'cover',
						}}
					/>
					<Card.Body>
						<h2 className="section-header">About Taniti</h2>
						<Card.Text
							style={{ fontSize: '1.15rem', color: '#323232' }}
						>
							Discover Taniti, a vibrant mosaic of culture and
							nature nestled in the Pacific. Spanning a diverse
							terrain of tropical rain forests, pristine beaches,
							and a gentle volcano, this small island paradise
							offers a unique blend of adventure and tranquility.
							With a rich heritage rooted in fishing and
							agriculture, Taniti has flourished into a haven for
							explorers and foodies alike, boasting a variety of
							local and international cuisines. Accommodations
							range from cozy bed and breakfasts to luxurious
							resorts, ensuring comfort for every traveler.
							Whether you&apos;re here to soak up the sun on sandy
							shores, delve into the lush wilderness, or immerse
							yourself in local life, Taniti promises an escape
							that&apos;s as enchanting as it is unforgettable.
						</Card.Text>
					</Card.Body>
				</Card>
			</div>
		</Layout>
	</Container>
);

export default AboutPage;

export const Head: HeadFC = () => <title>About Page</title>;
