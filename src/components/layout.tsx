import React, { ReactNode } from 'react';
import { Col, Navbar, Row } from 'react-bootstrap';

const Layout = ({ children }: { children: ReactNode }) => {
	console.debug();
	return (
		<>
			<Navbar className="bg-body-tertiary">
				<Navbar.Brand href="/">
					<Row>
						<Col>TT</Col>
						<Col>Tropical Taniti</Col>
					</Row>
				</Navbar.Brand>
			</Navbar>
			{children}
		</>
	);
};

export default Layout;
