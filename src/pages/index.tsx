import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Container } from 'react-bootstrap';

import Layout from '../components/layout';
import '../scss/main.scss';

const IndexPage: React.FC<PageProps> = () => {
	console.debug();
	return (
		<Container fluid>
			<Layout>Home testing</Layout>
		</Container>
	);
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
