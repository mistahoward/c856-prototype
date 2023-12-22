import React from 'react';
import {
	Card, Col, Container, Row
} from 'react-bootstrap';
import { HeadFC, graphql, useStaticQuery } from 'gatsby';
import tanitiReviews from '../data/reviews';
import Layout from '../components/layout';

import '../scss/main.scss';
import ReviewCard from '../components/review-card';
import RatingStars from '../components/rating-star';

const ReviewPage = () => {
	const imageData = useStaticQuery(graphql`
		query {
			allFile(filter: { sourceInstanceName: { eq: "images" } }) {
				edges {
					node {
						childImageSharp {
							gatsbyImageData(layout: FULL_WIDTH)
						}
						relativePath
					}
				}
			}
		}
	`);
	const reviewCards = tanitiReviews.map((review) => {
		const image = imageData.allFile.edges.find(
			(edge: { node: { relativePath: string; }; }) => edge.node.relativePath === review.image
		)?.node.childImageSharp.gatsbyImageData;
		return (<ReviewCard key={review.name + review.date} review={review} gatsbyImage={image} />)
	});
	return (
		<Container id="root" fluid>
			<Layout>
				<Container>
					<Row>
						<Col xs={3} className="average-ratings">
							<Card body>
								<div className="text-center">
									<RatingStars rating={4.5} size="2x" />
								</div>
								<div className="text-center">
									<h1>4.5</h1>
									<h3>out of 5</h3>
									<h4>based on 3884 reviews</h4>
								</div>
							</Card>
						</Col>
						<Col>
							<Row>{reviewCards}</Row>
						</Col>
					</Row>
				</Container>
			</Layout>
		</Container>
	);
};

export default ReviewPage;

export const Head: HeadFC = () => <title>Review Page</title>;
