import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';

import type { MarkerListProps } from './types';

const MarkersList = ({ locations, title = 'Markers', map, openPopup }: MarkerListProps) => {
	const imageData = useStaticQuery(graphql`
		query {
			allFile(filter: { sourceInstanceName: { eq: "images" } }) {
				edges {
					node {
						childImageSharp {
							gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
						}
						relativePath
					}
				}
			}
		}
	`);
	return (
		<div className="markers-sidebar">
			<h3>{title}</h3>
			{locations.map((marker, index) => {
				const image = imageData.allFile.edges.find(
					(edge: { node: { relativePath: string } }) =>
						edge.node.relativePath === marker.image
				)?.node.childImageSharp.gatsbyImageData;
				return (
					<Row
						key={`${marker.id}-row`}
						className="mb-2 location-card"
						onClick={() => {
							map.setView(marker.coordinates, 13);
							openPopup(index);
						}}
					>
						<Card>
							<GatsbyImage
								className="card-img-top"
								image={image}
								alt={marker.title}
							/>
							<Card.Body>
								<Card.Title>{marker.title}</Card.Title>
								<Card.Text>{marker.description}</Card.Text>
							</Card.Body>
						</Card>
					</Row>
				);
			})}
		</div>
	);
};

export default MarkersList;
