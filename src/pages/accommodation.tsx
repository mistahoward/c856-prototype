import React from 'react';
import { HeadFC } from 'gatsby';
import { Container } from 'react-bootstrap';

import Layout from '../components/layout';

import '../scss/main.scss';

const AccommodationPage = () => (
	<Container fluid id="root">
		<Layout>
			I&apos;m a page! Look at me!
		</Layout>
	</Container>
);

export default AccommodationPage;

export const Head: HeadFC = () => <title>Accommodation Page</title>;
