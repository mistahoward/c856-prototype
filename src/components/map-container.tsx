import React, { useMemo, useRef, useState } from 'react';

import { Row, Col, Button } from 'react-bootstrap';
import {
	MapContainer as LeafletMapContainer, Marker, Popup, TileLayer
} from 'react-leaflet';
import { navigate, withPrefix } from 'gatsby';

import type { MapContainerProps } from './types';
import MarkersList from './marker-list';

const MapContainer = ({ locations, type }: MapContainerProps) => {
	const position = [-16.5004, -151.7415];
	const [map, setMap] = useState<any>(null);
	const markerRefs = useRef<any>([]);

	const openPopup = (index: number) => {
		if (markerRefs.current[index]) {
			markerRefs.current[index].openPopup();
		}
	};

	const displayMap = useMemo(
		() => (
			<LeafletMapContainer center={position} zoom={13} scrollWheelZoom={false} ref={setMap}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{locations.map((marker, index) => (
					<Marker
						key={marker.id}
						position={marker.coordinates}
						ref={(ref) => {
							markerRefs.current[index] = ref;
						}}
					>
						<Popup>
							<Row className="mb-1">
								<Col>
									<img src={marker.image} width="100%" alt={marker.title} />
								</Col>
							</Row>
							<Row className="mb-1">
								<Col><h4>{marker.title}</h4></Col>
							</Row>
							<Row>
								<Col>
									<Button
										className="w-100"
										variant="primary"
										onClick={() => {
											navigate(`/c856-prototype/${type}/?${marker.id}`);
										}}
									>
										See More
									</Button>
								</Col>
							</Row>
						</Popup>
					</Marker>
				))}
			</LeafletMapContainer>
		),
		[]
	);
	return (
		<div className="map-container">
			<MarkersList
				openPopup={openPopup}
				map={map}
				title="Accommodations"
				locations={locations}
			/>
			{displayMap}
		</div>
	);
};

export default MapContainer;
