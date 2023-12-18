import React, { FC } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Container, Carousel, Card, Button, Row, Col } from 'react-bootstrap';
import { StaticImage } from 'gatsby-plugin-image';

import Layout from '../components/layout';

import tanitiAccommodations from '../data/accommodations';
import tanitiDestinations from '../data/destinations';

import '../scss/main.scss';

const IndexPage: FC<PageProps> = () => {
	const accommodationsToDisplay = tanitiAccommodations.slice(0, 3);
	const destinationsToDisplay = tanitiDestinations.slice(0, 3);

	const accommodationCards = accommodationsToDisplay.map((accommodation) => (
		<Col>
			<Card>
				<StaticImage className="card-img-top" src={accommodation.image} alt={accommodation.title} />
				<Card.Body>
					<Card.Title>{accommodation.title}</Card.Title>
					<Card.Text>{accommodation.description}</Card.Text>
					<Button variant="primary" href={`/c856-prototype/accommodation/?${accommodation.id}`}>Read More</Button>
				</Card.Body>
			</Card>
		</Col>
	));

	const destinationCards = destinationsToDisplay.map((destination) => (
		<Col>
			<Card>
				<StaticImage className="card-img-top" src={destination.image} alt={destination.title} />
				<Card.Body>
					<Card.Title>{destination.title}</Card.Title>
					<Card.Text>{destination.description}</Card.Text>
					<Button href={`/c856-prototype/destination/?${destination.id}`} variant="primary">Read More</Button>
				</Card.Body>
			</Card>
		</Col>
	));

	return (
		<Container fluid id="root">
			<Layout>
				<Carousel fade id="main-carousel">
					<Carousel.Item>
						<StaticImage src="../images/carousel_1.jpg" alt="Tropical Scene" />
						<div className="overlay" />
						<Carousel.Caption>
							<h3>Your Palm-Shadowed Sanctuary Awaits</h3>
							<p>
								Photo by &nbsp;
								<a href="https://unsplash.com/@itte?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
									Ittemaldiviano 🇲🇻
								</a>
								&nbsp;on&nbsp;
								<a href="https://unsplash.com/photos/green-palm-tree-on-white-sand-beach-during-daytime-jmkMl20jNS0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
									Unsplash
								</a>
							</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<StaticImage
							src="../images/carousel_2.jpg"
							alt="Coconut Trees and Body of Water"
						/>
						<div className="overlay" />
						<Carousel.Caption>
							<h3>Serenity in Shades of Blue</h3>
							<p>
								Photo by &nbsp;
								<a href="https://unsplash.com/@nickkane?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
									Nick Kane
								</a>
								&nbsp;on&nbsp;
								<a href="https://unsplash.com/photos/coconut-trees-and-body-of-water-painting-eaI3VpRnMbw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
									Unsplash
								</a>
							</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<StaticImage
							src="../images/carousel_3.jpg"
							alt="Tropical Cliff line with a village"
						/>
						<div className="overlay" />
						<Carousel.Caption>
							<h3>Coastal Charm, Sunlit Dreams</h3>
							<p>
								Photo by&nbsp;
								<a href="https://unsplash.com/@nathan_cima?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
									Nathan Cima
								</a>
								&nbsp;on&nbsp;
								<a href="https://unsplash.com/photos/a-view-of-a-beach-with-houses-on-the-cliff-2KZksT2BSDw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
									Unsplash
								</a>
							</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
				<div className="image-card-container">
					<Card>
						<Card.Body>
							<Card.Title>About</Card.Title>
							<Card.Text>
								Taniti is a diverse and idyllic Pacific island, offering a mix of
								adventure and serenity with its tropical rainforests, beaches, a
								volcano, and a rich cultural heritage.
							</Card.Text>
							<Button variant="primary">Read more</Button>
						</Card.Body>
					</Card>
					<StaticImage src="../images/lady_1.jpg" alt="Lady on a Beach holding a drink" />
					<div className="attribution-overlay">
						Photo by&nbsp;
						<a href="https://unsplash.com/@emilybauman__?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
							Emily Bauman
						</a>
						&nbsp;on&nbsp;
						<a href="https://unsplash.com/photos/person-holding-coconut-fnAN6OFXR9A?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
							Unsplash
						</a>
					</div>
				</div>
				<Container className="mt-4 mb-4">
					<Row>
						<h1 className="display-4">Destinations</h1>
					</Row>
					<Row>
						{destinationCards}
					</Row>
				</Container>
				<div className="image-card-container">
					<Card>
						<Card.Body>
							<Card.Title>Reviews</Card.Title>
							<Card.Text>
								Explore the enchantment of Taniti: Discover traveler reviews and
								experiences in this Pacific paradise.
							</Card.Text>
							<Button href="/c856-prototype/reviews" variant="primary">
								View Reviews
							</Button>
						</Card.Body>
					</Card>
					<StaticImage
						src="../images/drink_1.jpg"
						alt="Lady on a Beach holding a drink"
					/>
					<div className="attribution-overlay">
						Photo by&nbsp;
						<a href="https://unsplash.com/@kaizennguyen?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
							Kaizen Nguyễn
						</a>
						&nbsp;on&nbsp;
						<a href="https://unsplash.com/photos/six-clear-glass-mason-jars-filled-with-juice-on-black-table-jcLcWL8D7AQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
							Unsplash
						</a>
					</div>
				</div>
				<Container className="mt-4 mb-4">
					<Row>
						<h1 className="display-4">Accommodations</h1>
					</Row>
					<Row>{accommodationCards}</Row>
				</Container>
			</Layout>
		</Container>
	);
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
