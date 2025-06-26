import React from 'react';
import { HeadFC, graphql, useStaticQuery } from 'gatsby';
import { Container } from 'react-bootstrap';
import Layout from '../components/layout';
import '../scss/main.scss';
import MapContainer from '../components/map-container';

const AccommodationsPage = () => {
	const data = useStaticQuery(graphql`
		query {
			allAccommodationDirect {
				nodes {
					id
					title
					description
					image
					link
					coordinates {
						lat
						lng
					}
				}
			}
		}
	`);
	const accommodations = data.allAccommodationDirect.nodes;
	return (
		<Container fluid id="root">
			<Layout>
				<MapContainer type="accommodation" locations={accommodations} />
			</Layout>
		</Container>
	);
};

export default AccommodationsPage;

export const Head: HeadFC = () => <title>Accommodations Page</title>;
