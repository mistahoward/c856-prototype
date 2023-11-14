import React from 'react';
import { HeadFC } from 'gatsby';
import { Container } from 'react-bootstrap';

import Layout from '../components/layout';

import '../scss/main.scss';
import tanitiAccommodations from '../data/accommodations';
import MapContainer from '../components/map-container';

const AccommodationsPage = () => (
	<Container fluid id="root">
		<Layout>
			<MapContainer locations={tanitiAccommodations} />
		</Layout>
	</Container>
);

export default AccommodationsPage;

export const Head: HeadFC = () => <title>Accommodations Page</title>;
