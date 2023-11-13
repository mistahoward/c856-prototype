import React from 'react';
import { Container } from 'react-bootstrap';
import { HeadFC } from 'gatsby';

import Layout from '../components/layout';
import '../scss/main.scss';

const ReviewPage = () => {
	console.debug();
	return (
		<Container id="root" fluid>
			<Layout>
				Opes, I&apos;m a page!
			</Layout>
		</Container>
	);
};

export default ReviewPage;

export const Head: HeadFC = () => <title>Review Page</title>;
