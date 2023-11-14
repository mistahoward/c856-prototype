import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { MarkerListProps } from './types';

const MarkersList = ({
	locations, title = 'Markers', map, openPopup
}: MarkerListProps) => (
	<div className="markers-sidebar">
		<h3>{title}</h3>
		{locations.map((marker, index) => (
			<Row
				className="mb-2 location-card"
				onClick={() => {
					map.setView(marker.coordinates, 13);
					openPopup(index);
				}}
			>
				<Card>
					<Card.Img variant="top" width={300} height={225} src={marker.image} />
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
