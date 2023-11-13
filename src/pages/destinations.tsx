import React from 'react';
import { Container } from 'react-bootstrap';
import { HeadFC } from 'gatsby';

import Layout from '../components/layout';
import '../scss/main.scss';

const DestinationPage = () => {
	console.debug();
	return (
		<Container id="root" fluid>
			<Layout>
				Opes, I&apos;m a page!
			</Layout>
		</Container>
	);
};

export default DestinationPage;

export const Head: HeadFC = () => <title>Destination Page</title>;
