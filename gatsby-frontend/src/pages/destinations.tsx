import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { HeadFC } from 'gatsby';
import { useQuery, gql } from '@apollo/client';

import Layout from '../components/layout';
import '../scss/main.scss';
import MapContainer from '../components/map-container';

const GET_DESTINATIONS_FOR_MAP = gql`
	query GetDestinationsForMap {
		destinations {
			id
			title
			description
			image
			coordinates {
				lat
				lng
			}
		}
	}
`;

const DestinationPage = () => {
	const {
		loading,
		error,
		data: apolloData,
	} = useQuery(GET_DESTINATIONS_FOR_MAP);

	if (loading)
		return (
			<Layout>
				<div
					className="d-flex justify-content-center align-items-center"
					style={{ height: '80vh' }}
				>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			</Layout>
		);

	if (error)
		return (
			<Layout>
				<p className="text-center mt-5">
					Error loading destinations: {error.message}
				</p>
			</Layout>
		);

	const destinations = apolloData?.destinations || [];

	return (
		<Container fluid id="root">
			<Layout>
				<MapContainer type="destination" locations={destinations} />
			</Layout>
		</Container>
	);
};

export default DestinationPage;

export const Head: HeadFC = () => <title>Destinations Page</title>;
