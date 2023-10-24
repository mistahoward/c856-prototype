import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Container, Carousel } from 'react-bootstrap';

import Layout from '../components/layout';
import '../scss/main.scss';

const IndexPage: React.FC<PageProps> = () => {
	console.debug();
	return (
		<Container fluid>
			<Layout>
				<Carousel fade>
					<Carousel.Item>
						<img src="https://picsum.photos/800/400?random=1" alt="First slide" />
					</Carousel.Item>
				</Carousel>
			</Layout>
		</Container>
	);
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
