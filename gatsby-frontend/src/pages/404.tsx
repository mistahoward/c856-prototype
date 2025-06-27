import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import { Container, Card, Button } from 'react-bootstrap';
import '../scss/main.scss';

const NotFoundPage: React.FC = () => (
	<Container fluid id="root">
		<Layout>
			<div className="image-card-container">
				<StaticImage
					src="../images/carousel_1.jpg"
					alt="Tropical Paradise"
				/>
				<div className="overlay" />
				<Card className="auth-card">
					<Card.Body className="text-center">
						<Card.Title className="display-6 mb-4">
							Page not found
						</Card.Title>
						<Card.Text className="mb-4">
							Sorry 😔, we couldn't find what you were looking
							for.
							<br />
							But don't worry, you can always go back home!
						</Card.Text>
						<Button
							as={Link as any}
							to="/"
							variant="outline-primary"
							size="lg"
						>
							Go home
						</Button>
					</Card.Body>
				</Card>
			</div>
		</Layout>
	</Container>
);

export default NotFoundPage;

export const Head = () => <title>Not found</title>;
