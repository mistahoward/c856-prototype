import React, { useMemo, useRef, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { MapContainer as LeafletMapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { startCase } from 'lodash';

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

	const imageData = useStaticQuery(graphql`
		query {
			allFile(filter: { sourceInstanceName: { eq: "images" } }) {
				edges {
					node {
						childImageSharp {
							gatsbyImageData(width: 200, layout: CONSTRAINED)
						}
						relativePath
					}
				}
			}
		}
	`);

	const displayMap = useMemo(
		() => (
			<LeafletMapContainer center={position} zoom={13} scrollWheelZoom={false} ref={setMap}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{locations.map((marker, index) => {
					const image = imageData.allFile.edges.find(
						(edge: { node: { relativePath: string; }; }) => edge.node.relativePath === marker.image
					)?.node.childImageSharp.gatsbyImageData;
					return (
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
										<GatsbyImage image={image} alt={marker.title} />
									</Col>
								</Row>
								<Row className="mb-1">
									<Col>
										<h4>{marker.title}</h4>
									</Col>
								</Row>
								<Row>
									<Col>
										<Button
											className="w-100"
											variant="primary"
											onClick={() => {
												navigate(`/${type}/?${marker.id}`);
											}}
										>
											See More
										</Button>
									</Col>
								</Row>
							</Popup>
						</Marker>
					);
				})}
			</LeafletMapContainer>
		),
		[]
	);
	return (
		<div className="map-container">
			<MarkersList
				openPopup={openPopup}
				map={map}
				title={startCase(type)}
				locations={locations}
			/>
			{displayMap}
		</div>
	);
};

export default MapContainer;
