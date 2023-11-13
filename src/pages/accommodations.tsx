import React from 'react';
import { HeadFC } from 'gatsby';
import { Container } from 'react-bootstrap';

import Layout from '../components/layout';
import MapDisplay from '../components/map';

import '../scss/main.scss';

const AccommodationsPage = () => (
	<Container fluid id="root">
		<Layout>
			<MapDisplay />
			testing
		</Layout>
	</Container>
);

export default AccommodationsPage;

export const Head: HeadFC = () => <title>Accommodations Page</title>;
