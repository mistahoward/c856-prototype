import React, { FC } from 'react';
import { HeadFC, PageProps, graphql, useStaticQuery } from 'gatsby';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { startCase } from 'lodash';
import currency from 'currency.js';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useQuery, gql } from '@apollo/client';

import Layout from '../components/layout';
import '../scss/main.scss';

const GET_ACCOMMODATION_BY_ID = gql`
  query GetAccommodationById($id: ID!) {
    accommodation(id: $id) {
      id
      title
      description
      image
      packages {
        expensive { price info }
        moderate { price info }
        cheapest { price info }
      }
    }
  }
`;

const AccommodationPage: FC<PageProps> = ({ location }) => {
    const requestedAccommodationId = location.search.replace('?', '');

    const gatsbyData = useStaticQuery(graphql`
        query GetAccommodationImages {
            allFile(filter: { sourceInstanceName: { eq: "images" } }) {
                nodes {
                    relativePath
                    childImageSharp {
                        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
                    }
                }
            }
        }
    `);

    const { loading, error, data: apolloData } = useQuery(GET_ACCOMMODATION_BY_ID, {
        variables: { id: requestedAccommodationId },
    });

    if (loading) {
        return (
            <Layout>
                <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </Layout>
        );
    }
    if (error) return <p>Error: {error.message}</p>;
    
    const accommodation = apolloData?.accommodation;

    if (!accommodation) {
        return (
            <Layout>
                <p className="text-center mt-5">Sorry, this accommodation could not be found.</p>
            </Layout>
        );
    }
    
    const gatsbyImage = getImage(gatsbyData.allFile.nodes.find(
        (node: any) => node.relativePath === accommodation.image
    )?.childImageSharp);

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
                <h1 className="display-4 text-center my-4">{accommodation.title}</h1>
                <p className="lead text-center mb-5">{accommodation.description}</p>
                <Row>
                    <Col xs={12} md={4}>
                        <Row className="ms-md-2">{accommodationCards}</Row>
                    </Col>
                    <Col xs={12} md={8}>
                        {gatsbyImage && (
                            <GatsbyImage
                                imgClassName="img-fluid rounded shadow-lg"
                                image={gatsbyImage}
                                alt={accommodation.title}
                            />
                        )}
                    </Col>
                </Row>
            </Layout>
        </Container>
    );
};

export default AccommodationPage;

export const Head: HeadFC = () => {
    return <title>Accommodation Details</title>;
};
