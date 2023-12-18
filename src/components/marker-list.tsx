import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { StaticImage } from 'gatsby-plugin-image';

import type { MarkerListProps } from './types';

const MarkersList = ({
	locations, title = 'Markers', map, openPopup
}: MarkerListProps) => (
	<div className="markers-sidebar">
		<h3>{title}</h3>
		{locations.map((marker, index) => (
			<Row
				key={`${marker.id}-row`}
				className="mb-2 location-card"
				onClick={() => {
					map.setView(marker.coordinates, 13);
					openPopup(index);
				}}
			>
				<Card>
					<StaticImage className="card-img-top" src={marker.image} alt={marker.title} />
					<Card.Body>
						<Card.Title>{marker.title}</Card.Title>
						<Card.Text>{marker.description}</Card.Text>
					</Card.Body>
				</Card>
			</Row>
		))}
	</div>
);

export default MarkersList;
