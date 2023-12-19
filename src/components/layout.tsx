import React, { useCallback, useRef, useState } from 'react';
import {
	Card, Col, Form, Nav, Navbar, Overlay, Popover, Row
} from 'react-bootstrap';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { startCase } from 'lodash';

import Fuse from 'fuse.js';
import type { LayoutProps } from './types';

import '../scss/main.scss';

const siteDataQuery = graphql`query {
	allAccommodation {
	  edges {
		node {
		  id
		  title
		  description
		  link
		}
	  }
	}
	allDestination {
	  edges {
		node {
		  id
		  title
		  description
		  link
		}
	  }
	}
	allReview {
	  edges {
		node {
		  id
		  name
		  review
		}
	  }
	}
	allSitePage {
	  edges {
		node {
		  id
		}
	  }
	}
  }`;

const blackListedPages = ['accommodation', 'destination', '404'];

const Layout = ({ children }: LayoutProps) => {
	const [search, setSearch] = useState('');
	const searchRef = useRef(null);

	const data = useStaticQuery(siteDataQuery);
	const dataNormalizer = Object.values(data)
		.map((value) => value.edges.map((edge) => edge.node))
		.flat();
	const normalizedData = dataNormalizer.filter((node) => {
		if (blackListedPages.some((page) => node.id.includes(page))) return false;
		return node;
	}).map((node) => {
		const sitePageEntry = node.id.includes('SitePage');
		if (sitePageEntry) {
			const pageLink = node.id.replace('SitePage ', '');
			const pageTitle = startCase(pageLink.replaceAll('/', ''));
			return {
				...node,
				link: pageLink,
				title: `${pageTitle} Page`,
			};
		}
		return {
			...node,
		};
	});

	const fuse = useCallback(() => new Fuse(normalizedData, { keys: ['title'] }), [dataNormalizer]);
	const results = fuse().search(search);
	const resultsList = results.map((result) => (
		<Card className="nav-card mb-1" onClick={() => navigate(`c856-prototype/${result.item.link}`)}>
			<Card.Body>
				<Card.Title>{result.item.title}</Card.Title>
				<Card.Text>{result.item.description}</Card.Text>
			</Card.Body>
		</Card>
	));
	const searchResults = (
		<Popover className="search-container">
			<Popover.Body>
				{resultsList}
			</Popover.Body>
		</Popover>
	);

	return (
		<>
			<Navbar expand="lg" id="header" className="bg-body-secondary">
				<Navbar.Brand href="/c856-prototype/">
					<Row>
						<Col className="ms-2">TT</Col>
						<Col>Tropical Taniti</Col>
					</Row>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/c856-prototype/about">About</Nav.Link>
						<Nav.Link href="/c856-prototype/destinations">Destinations</Nav.Link>
						<Nav.Link href="/c856-prototype/accommodations">Accommodations</Nav.Link>
						<Nav.Link href="/c856-prototype/reviews">Reviews</Nav.Link>
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
			{children}
			<Navbar id="footer" className="bg-body-secondary">
				<Navbar.Collapse className="justify-content-center">
					<Navbar.Text>Copyright 2023</Navbar.Text>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default Layout;
