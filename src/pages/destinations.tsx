import React from 'react';
import { Container } from 'react-bootstrap';
import { HeadFC } from 'gatsby';

import Layout from '../components/layout';
import '../scss/main.scss';
import MapContainer from '../components/map-container';
import tanitiDestinations from '../data/destinations';

const DestinationPage = () => (
	<Container fluid id="root">
		<Layout>
			<MapContainer type="destination" locations={tanitiDestinations} />
		</Layout>
	</Container>
);

export default DestinationPage;

export const Head: HeadFC = () => <title>Destination Page</title>;
