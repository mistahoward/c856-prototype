import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';

import type { MarkerListProps } from './types';
import FavoriteButton from './favorite-button';

const MarkersList = ({
	locations,
	title = 'Markers',
	map,
	openPopup,
}: MarkerListProps) => {
	const imageData = useStaticQuery(graphql`
		query {
			allFile(filter: { sourceInstanceName: { eq: "images" } }) {
				nodes {
					childImageSharp {
						gatsbyImageData(
							layout: FULL_WIDTH
							placeholder: BLURRED
						)
					}
					relativePath
				}
			}
		}
	`);
	return (
		<div className="markers-sidebar">
			<h3>{title}</h3>
			{locations.map((marker, index) => {
				const image = imageData.allFile.nodes.find(
					(node: { relativePath: string }) =>
						node.relativePath === marker.image
				)?.childImageSharp?.gatsbyImageData;
				return (
					<Row
						key={`${marker.id}-row`}
						className="mb-2 location-card"
					>
						<Card>
							{image && (
								<GatsbyImage
									className="card-img-top"
									image={image}
									alt={marker.title}
								/>
							)}
							<Card.Body>
								<Row>
									<Col xs={10}>
										<Card.Title>{marker.title}</Card.Title>
										<Card.Text>
											{marker.description}
										</Card.Text>
									</Col>
									<Col xs={2} className="text-end">
										<FavoriteButton
											type={
												title
													.toLowerCase()
													.includes('accommodation')
													? 'accommodation'
													: 'destination'
											}
											itemId={marker.id.toString()}
											size="sm"
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<button
											className="btn btn-primary w-100 mt-2"
											onClick={() => {
												map.setView(
													marker.coordinates,
													13
												);
												openPopup(index);
											}}
										>
											View on Map
										</button>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Row>
				);
			})}
		</div>
	);
};

export default MarkersList;
