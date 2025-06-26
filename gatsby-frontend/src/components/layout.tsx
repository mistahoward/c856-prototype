import React, { useRef, useState } from 'react';
import {
	Card, Col, Form, Nav, Navbar, Overlay, Popover, Row
} from 'react-bootstrap';
import { graphql, navigate, withPrefix, useStaticQuery } from 'gatsby';
import type { LayoutProps } from './types';
import '../scss/main.scss';

const Layout = ({ children }: LayoutProps) => {
	const [search, setSearch] = useState('');
	const searchRef = useRef<HTMLInputElement>(null);

	const data = useStaticQuery(graphql`query {
		allAccommodationDirect {
		  edges {
			node {
			  id
			  title
			  description
			  link
			}
		  }
		}
		allDestinationDirect {
		  edges {
			node {
			  id
			  title
			  description
			  link
			}
		  }
		}
		allReviewDirect {
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
	  }`);

	const allData = [
		...data.allAccommodationDirect.edges.map((edge: any) => ({
			...edge.node,
			type: 'accommodation'
		})),
		...data.allDestinationDirect.edges.map((edge: any) => ({
			...edge.node,
			type: 'destination'
		})),
		...data.allReviewDirect.edges.map((edge: any) => ({
			...edge.node,
			title: edge.node.name,
			description: edge.node.review,
			link: '/reviews',
			type: 'review'
		}))
	];

	const normalizedData = allData.filter((node: any) => {
		return node.title && node.description && node.link;
	});

	const results = normalizedData.filter((node: any) =>
		node.title.toLowerCase().includes(search.toLowerCase()) ||
		node.description.toLowerCase().includes(search.toLowerCase())
	);

	const resultsList = results.map((result: any) => (
		<Card className="nav-card mb-1" onClick={() => navigate(result.link)} key={result.id}>
			<Card.Body>
				<Card.Title>{result.title}</Card.Title>
				<Card.Text>{result.description}</Card.Text>
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
