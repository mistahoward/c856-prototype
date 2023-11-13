import React from 'react';
import {
	MapContainer, TileLayer, Marker, Popup
} from 'react-leaflet';

import '../scss/main.scss';

const MapDisplay = () => {
	const position = [-16.5004, -151.7415];

	return (
		<MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
		</MapContainer>
	);
};

export default MapDisplay;
