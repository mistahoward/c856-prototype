import React from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { HeadFC, graphql, useStaticQuery } from 'gatsby';
import { useQuery, gql } from '@apollo/client';
import { getImage } from 'gatsby-plugin-image';

import Layout from '../components/layout';
import '../scss/main.scss';
import ReviewCard from '../components/review-card';
import RatingStars from '../components/rating-star';
import { Ratings } from '../types';

const GET_REVIEWS = gql`
  query GetReviews {
    reviews {
      id
      name
      age
      review
      rating
      image
      date
    }
  }
`;


const ReviewPage = () => {
    const gatsbyData = useStaticQuery(graphql`
        query GetReviewImages {
            allFile(filter: { sourceInstanceName: { eq: "images" } }) {
                nodes {
                    relativePath
                    childImageSharp {
                        gatsbyImageData(layout: FULL_WIDTH)
                    }
                }
            }
        }
    `);

    const { loading, error, data: apolloData } = useQuery(GET_REVIEWS);

    const imageMap = new Map();
    gatsbyData.allFile.nodes.forEach((node: any) => {
        imageMap.set(node.relativePath, getImage(node.childImageSharp));
    });

    if (loading) 
        return (
            <Layout>
                <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </Layout>
        );
    if (error) 
        return <Layout><p className="text-center mt-5">Error loading reviews: {error.message}</p></Layout>;

    const reviews = apolloData?.reviews || [];
    
    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0) / reviews.length).toFixed(1)
        : 0;

    const reviewCards = reviews.map((review: any) => {
        const gatsbyImage = imageMap.get(review.image);
        return (<ReviewCard key={review.id} review={review} gatsbyImage={gatsbyImage} />)
    });

    return (
        <Container id="root" fluid>
            <Layout>
                <Container>
                    <Row>
                        <Col xs={12} md={3} className="average-ratings">
                            <Card body className="position-sticky" style={{top: '2rem'}}>
                                <div className="text-center">
                                    <RatingStars rating={Number(averageRating) as Ratings} size="2x" />
                                </div>
                                <div className="text-center">
                                    <h1>{averageRating}</h1>
                                    <h3>out of 5</h3>
                                    <h4>based on {reviews.length} reviews</h4>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={12} md={9}>
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
