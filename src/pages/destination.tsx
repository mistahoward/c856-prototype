import React from 'react';
import { HeadFC } from 'gatsby';
import { Container } from 'react-bootstrap';

import Layout from '../components/layout';

import '../scss/main.scss';

const DestinationPage = () => (
	<Container fluid id="root">
		<Layout>
			I&apos;m a page! Look at me!
		</Layout>
	</Container>
);

export default DestinationPage;

export const Head: HeadFC = () => <title>Destination Page</title>;
