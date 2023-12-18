import React, { useCallback, useState } from 'react';
import {
	Button, Col, Form, Nav, Navbar, Row
} from 'react-bootstrap';
import { useStaticQuery, graphql } from 'gatsby';

import Fuse from 'fuse.js';
import type { LayoutProps } from './types';

const query = graphql`query {
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

const Layout = ({ children }: LayoutProps) => {
	const [search, setSearch] = useState('');
	const data = useStaticQuery(query);
	const dataNormalizer = Object.values(data)
		.map((value) => value.edges.map((edge) => edge.node))
		.flat();
	const normalizedData = dataNormalizer.map((node) => {
		if (!node?.title) {
			const pageLink = node.id.replace('SitePage ', '');
			const pageTitle = pageLink.replace('/', '');
			return {
				...node,
				link: pageLink,
				title: pageTitle,
			};
		}
		return {
			...node,
		};
	});
	const fuse = useCallback(() => new Fuse(dataNormalizer, { keys: ['title'] }), [dataNormalizer]);
	const results = fuse().search(search);
	console.log(normalizedData);

	return (
		<>
			<Navbar expand="lg" id="header" className="bg-body-secondary">
				<Navbar.Brand href="/">
					<Row>
						<Col className="ms-2">TT</Col>
						<Col>Tropical Taniti</Col>
					</Row>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/about">About</Nav.Link>
						<Nav.Link href="/destinations">Destinations</Nav.Link>
						<Nav.Link href="/accommodations">Accommodations</Nav.Link>
						<Nav.Link href="/reviews">Reviews</Nav.Link>
					</Nav>
					<Form className="me-2">
						<Row>
							<Col xs="auto">
								<Form.Control
									type="text"
									placeholder="Search"
									className="me-sm-2"
									onChange={(e) => setSearch(e.target.value)}
								/>
							</Col>
							<Col>
								<Button
									onClick={(e) => {
										e.preventDefault();
										console.log(results);
									}}
									variant="outline-secondary"
									type="submit"
								>
									Submit
								</Button>
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
