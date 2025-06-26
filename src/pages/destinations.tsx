import React from 'react';
import { Container } from 'react-bootstrap';
import { HeadFC, graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import '../scss/main.scss';
import MapContainer from '../components/map-container';

const DestinationPage = () => {
	const data = useStaticQuery(graphql`
		query {
			allDestinationDirect {
				nodes {
					id
					title
					description
					detailed_description
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
	const destinations = data.allDestinationDirect.nodes;
	return (
		<Container fluid id="root">
			<Layout>
				<MapContainer type="destination" locations={destinations} />
			</Layout>
		</Container>
	);
};

export default DestinationPage;

export const Head: HeadFC = () => <title>Destination Page</title>;
