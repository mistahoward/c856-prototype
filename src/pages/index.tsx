import React, { FC } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Container, Carousel } from 'react-bootstrap';

import Layout from '../components/layout';
import '../scss/main.scss';

const IndexPage: FC<PageProps> = () => {
	console.debug();
	return (
		<Container fluid id="root">
			<Layout>
				<Carousel fade id="main-carousel">
					<Carousel.Item>
						Photo by &nbsp;
						<a href="https://unsplash.com/@itte?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
							Ittemaldiviano 🇲🇻
						</a>
						&nbsp;on&nbsp;
						<a href="https://unsplash.com/photos/green-palm-tree-on-white-sand-beach-during-daytime-jmkMl20jNS0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
							Unsplash
						</a>
					</Carousel.Item>
				</Carousel>
			</Layout>
		</Container>
	);
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
