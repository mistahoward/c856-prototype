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
						<div className="overlay" />
						<Carousel.Caption>
							<h3>Your Palm-Shadowed Sanctuary Awaits</h3>
							<p>
								Photo by &nbsp;
								<a href="https://unsplash.com/@itte?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
									Ittemaldiviano 🇲🇻
								</a>
								&nbsp;on&nbsp;
								<a href="https://unsplash.com/photos/green-palm-tree-on-white-sand-beach-during-daytime-jmkMl20jNS0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
									Unsplash
								</a>
							</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<StaticImage
							src="../images/carousel_2.jpg"
							alt="Coconut Trees and Body of Water"
						/>
						<div className="overlay" />
						<Carousel.Caption>
							<h3>Serenity in Shades of Blue</h3>
							<p>
								Photo by &nbsp;
								<a href="https://unsplash.com/@nickkane?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
									Nick Kane
								</a>
								&nbsp;on&nbsp;
								<a href="https://unsplash.com/photos/coconut-trees-and-body-of-water-painting-eaI3VpRnMbw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
									Unsplash
								</a>
							</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<StaticImage
							src="../images/carousel_3.jpg"
							alt="Tropical Cliff line with a village"
						/>
						<div className="overlay" />
						<Carousel.Caption>
							<h3>Coastal Charm, Sunlit Dreams</h3>
							<p>
								Photo by&nbsp;
								<a href="https://unsplash.com/@nathan_cima?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
									Nathan Cima
								</a>
								&nbsp;on&nbsp;
								<a href="https://unsplash.com/photos/a-view-of-a-beach-with-houses-on-the-cliff-2KZksT2BSDw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
									Unsplash
								</a>
							</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
				Photo by <a href="https://unsplash.com/@emilybauman__?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Emily Bauman</a> on <a href="https://unsplash.com/photos/person-holding-coconut-fnAN6OFXR9A?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  
			</Layout>
		</Container>
	);
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
