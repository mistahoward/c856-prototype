import React, { FC, useMemo, useRef, useState } from 'react';
import { Card, Col, Form, Nav, Navbar, Overlay, Popover, Row, Spinner } from 'react-bootstrap';
import { navigate, withPrefix } from 'gatsby';
import { useQuery, gql } from '@apollo/client';

import type { LayoutProps } from './types';
import '../scss/main.scss';

const GET_SEARCH_DATA = gql`
  query GetSearchData {
    accommodations {
      id
      title
      description
    }
    destinations {
      id
      title
      description
    }
    reviews {
      id
      name
      review
    }
  }
`;

const Layout: FC<LayoutProps> = ({ children }) => {
    const [search, setSearch] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);

    const { loading, error, data: apolloData } = useQuery(GET_SEARCH_DATA);

    const normalizedData = useMemo(() => {
        if (loading || error || !apolloData) {
            return [];
        }
        
        return [
            ...apolloData.accommodations.map((item: any) => ({
                ...item,
                type: 'accommodation',
                link: `/accommodation/?${item.id}`,
            })),
            ...apolloData.destinations.map((item: any) => ({
                ...item,
                type: 'destination',
                link: `/destination/?${item.id}`,
            })),
            ...apolloData.reviews.map((item: any) => ({
                id: item.id,
                title: `Review by ${item.name}`,
                description: item.review,
                type: 'review',
                link: '/reviews/',
            })),
        ];
    }, [apolloData, loading, error]);

    const results = search
        ? normalizedData.filter((node: any) =>
            node.title.toLowerCase().includes(search.toLowerCase()) ||
            node.description.toLowerCase().includes(search.toLowerCase())
          )
        : [];

    const resultsList = results.map((result: any) => (
        <Card className="nav-card mb-1" onClick={() => navigate(result.link)} key={`${result.type}-${result.id}`}>
            <Card.Body>
                <Card.Title>{result.title}</Card.Title>
                <Card.Text className="text-truncate">{result.description}</Card.Text>
            </Card.Body>
        </Card>
    ));

    const searchResults = (
        <Popover className="search-container">
            <Popover.Body>
                {loading && <div className="text-center p-2"><Spinner size="sm" /></div>}
                {error && <div className="text-danger p-2">Could not load results.</div>}
                {!loading && !error && (results.length > 0 ? resultsList : <div className="p-2">No results found.</div>)}
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <Navbar expand="lg" id="header" className="bg-body-secondary">
                <Navbar.Brand href={withPrefix('/')}>
                    <Row>
                        <Col className="ms-2">TT</Col>
                        <Col>Tropical Taniti</Col>
                    </Row>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href={withPrefix('/about')}>About</Nav.Link>
                        <Nav.Link href={withPrefix('/destinations')}>Destinations</Nav.Link>
                        <Nav.Link href={withPrefix('/accommodations')}>Accommodations</Nav.Link>
                        <Nav.Link href={withPrefix('/reviews')}>Reviews</Nav.Link>
                    </Nav>
                    <Form className="me-2">
                        <Row>
                            <Col xs="auto">
                                <Overlay placement="bottom-start" target={searchRef.current} show={(!!search)}>
                                    {searchResults}
                                </Overlay>
                                <Form.Control
                                    ref={searchRef}
                                    type="text"
                                    placeholder="Search"
                                    className="me-sm-2"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            
            <main>{children}</main>

            <Navbar id="footer" className="bg-body-secondary">
                <Navbar.Collapse className="justify-content-center">
                    <Navbar.Text>Made with ❤️ by <a href="https://alexhoward.dev/">Alex</a></Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Layout;
