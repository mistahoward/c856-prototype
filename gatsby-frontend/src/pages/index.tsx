import React, { FC } from 'react';
import { useStaticQuery, type HeadFC, type PageProps, graphql, withPrefix } from 'gatsby';
import { Container, Carousel, Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import { GatsbyImage, StaticImage, getImage } from 'gatsby-plugin-image';
import { useQuery, gql } from '@apollo/client';

import Layout from '../components/layout';
import '../scss/main.scss';

const GET_INDEX_DATA = gql`
  query GetIndexData {
    accommodations {
      id
      title
      description
      image
    }
    destinations {
      id
      title
      description
      image
    }
  }
`;

const DataCard = ({ item, image }: { item: any, image: any }) => (
    <Col key={item.id} md={4} className="mb-4">
        <Card className="h-100 shadow-sm">
            {image && <GatsbyImage className="card-img-top" image={image} alt={item.title} />}
            <Card.Body className="d-flex flex-column">
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Button
                    variant="primary"
                    href={withPrefix(`/${item.__typename.toLowerCase()}/?${item.id}`)}
                    className="mt-auto"
                >
                    Read More
                </Button>
            </Card.Body>
        </Card>
    </Col>
);


const IndexPage: FC<PageProps> = () => {
    const gatsbyData = useStaticQuery(graphql`
        query GetIndexImages {
            allFile(filter: { sourceInstanceName: { eq: "images" } }) {
                nodes {
                    relativePath
                    childImageSharp {
                        gatsbyImageData(width: 400, layout: CONSTRAINED, placeholder: BLURRED)
                    }
                }
            }
        }
    `);

    const { loading, error, data: apolloData } = useQuery(GET_INDEX_DATA);

    const imageMap = new Map();
    gatsbyData.allFile.nodes.forEach((node: any) => {
        imageMap.set(node.relativePath, getImage(node.childImageSharp));
    });

    const LoadingCards = () => (
        <Row>
            {[...Array(3)].map((_, i) => (
                <Col key={i} md={4} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Spinner animation="border" size="sm" />
                            <Card.Title className="placeholder-glow mt-2">
                                <span className="placeholder col-6"></span>
                            </Card.Title>
                            <Card.Text className="placeholder-glow">
                                <span className="placeholder col-7"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );

    return (
        <Container fluid id="root">
            <Layout>
                <Carousel fade id="main-carousel">
                    <Carousel.Item>
                        <StaticImage src="../images/carousel_1.jpg" alt="Tropical Scene" />
                        <div className="overlay" />
                        <Carousel.Caption>
                            <h3>Your Palm-Shadowed Sanctuary Awaits</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <StaticImage src="../images/carousel_2.jpg" alt="Coconut Trees and Body of Water"/>
                        <div className="overlay" />
                        <Carousel.Caption>
                            <h3>Serenity in Shades of Blue</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <StaticImage src="../images/carousel_3.jpg" alt="Tropical Cliff line with a village"/>
                        <div className="overlay" />
                        <Carousel.Caption>
                            <h3>Coastal Charm, Sunlit Dreams</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <div className="image-card-container">
                    <Card>
                        <Card.Body>
                            <Card.Title>About</Card.Title>
                            <Card.Text>
                                Taniti is a diverse and idyllic Pacific island, offering a mix of adventure and serenity.
                            </Card.Text>
                            <Button variant="primary" href={withPrefix('/about')}>Read more</Button>
                        </Card.Body>
                    </Card>
                    <StaticImage src="../images/lady_1.jpg" alt="Lady on a Beach holding a drink" />
                </div>
                <Container className="mt-4 mb-4">
                    <h1 className="display-4">Destinations</h1>
                    {loading ? <LoadingCards /> :
                     error ? <p>Error loading destinations: {error.message}</p> :
                     <Row>
                        {apolloData?.destinations.slice(0, 3).map((destination: any) => (
                            <DataCard 
                                key={destination.id}
                                item={{...destination, __typename: 'destination'}}
                                image={imageMap.get(destination.image)}
                            />
                        ))}
                    </Row>}
                </Container>
                <div className="image-card-container">
                    <Card>
                        <Card.Body>
                            <Card.Title>Reviews</Card.Title>
                            <Card.Text>
                                Explore the enchantment of Taniti: Discover traveler reviews and experiences.
                            </Card.Text>
                            <Button href={withPrefix('/about')} variant="primary">
                                View Reviews
                            </Button>
                        </Card.Body>
                    </Card>
                    <StaticImage src="../images/drink_1.jpg" alt="Lady on a Beach holding a drink" />
                </div>

                <Container className="mt-4 mb-4">
                    <h1 className="display-4">Accommodations</h1>
                    {loading ? <LoadingCards /> :
                     error ? <p>Error loading accommodations: {error.message}</p> :
                     <Row>
                        {apolloData?.accommodations.slice(0, 3).map((accommodation: any) => (
                            <DataCard 
                                key={accommodation.id}
                                item={{...accommodation, __typename: 'accommodation'}}
                                image={imageMap.get(accommodation.image)}
                            />
                        ))}
                    </Row>}
                </Container>

            </Layout>
        </Container>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
