import React, { FC } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Container, Carousel } from 'react-bootstrap';
import { StaticImage } from 'gatsby-plugin-image';

import Layout from '../components/layout';
import '../scss/main.scss';

const IndexPage: FC<PageProps> = () => {
	console.debug();
	return (
		<Container fluid id="root">
			<Layout>
				<Carousel fade id="main-carousel">
					<Carousel.Item>
						<StaticImage src="../images/carousel_1.jpg" alt="Tropical Scene" />
						<Carousel.Caption className="text-black">
							Photo by &nbsp;
							<a href="https://unsplash.com/@itte?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
								Ittemaldiviano 🇲🇻
							</a>
							&nbsp;on&nbsp;
							<a href="https://unsplash.com/photos/green-palm-tree-on-white-sand-beach-during-daytime-jmkMl20jNS0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
								Unsplash
							</a>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<StaticImage
							src="../images/carousel_2.jpg"
							alt="Coconut Trees and Body of Water"
						/>
						<Carousel.Caption>
							Photo by &nbsp;
							<a href="https://unsplash.com/@nickkane?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
								Nick Kane
							</a>
							&nbsp;on&nbsp;
							<a href="https://unsplash.com/photos/coconut-trees-and-body-of-water-painting-eaI3VpRnMbw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
								Unsplash
							</a>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<StaticImage
							src="../images/carousel_3.jpg"
							alt="Tropical Cliff line with a village"
						/>
						<Carousel.Caption className="text-black">
							Photo by&nbsp;
							<a href="https://unsplash.com/@nathan_cima?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
								Nathan Cima
							</a>
							&nbsp;on&nbsp;
							<a href="https://unsplash.com/photos/a-view-of-a-beach-with-houses-on-the-cliff-2KZksT2BSDw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
								Unsplash
							</a>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</Layout>
		</Container>
	);
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
