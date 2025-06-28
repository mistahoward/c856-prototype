import React from 'react';
import { HeadFC } from 'gatsby';
import { Container, Spinner } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';

import Layout from '../components/layout';
import '../scss/main.scss';
import MapContainer from '../components/map-container';

const GET_ACCOMMODATIONS_FOR_MAP = gql`
	query GetAccommodationsForMap {
		accommodations {
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

const AccommodationsPage = () => {
	const {
		loading,
		error,
		data: apolloData,
	} = useQuery(GET_ACCOMMODATIONS_FOR_MAP);

	if (loading) {
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
	}

	if (error)
		return (
			<Layout>
				<p className="text-center mt-5">
					Error loading accommodations: {error.message}
				</p>
			</Layout>
		);

	const accommodations = apolloData?.accommodations || [];

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
