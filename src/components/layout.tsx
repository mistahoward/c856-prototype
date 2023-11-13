import React, { ReactNode } from 'react';
import {
	Button, Col, Form, Nav, Navbar, Row
} from 'react-bootstrap';

const Layout = ({ children }: { children: ReactNode }) => (
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
							<Form.Control type="text" placeholder="Search" className="me-sm-2" />
						</Col>
						<Col>
							<Button variant="outline-secondary" type="submit">
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

export default Layout;
