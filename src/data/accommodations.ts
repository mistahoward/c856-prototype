import type { Accommodation } from '../types';

const tanitiAccommodations: Accommodation[] = [
	{
		title: 'Lagoon Paradise Resort',
		description: 'A luxurious resort offering overwater bungalows with stunning views of the lagoon.',
		coordinates: { lat: -16.4990, lng: -151.7370 },
		packages: {
			expensive: {
				price: 1500,
				info: 'Includes a private villa, gourmet dining, spa treatments, and a personal tour guide.'
			},
			moderate: {
				price: 950,
				info: 'Features an overwater bungalow, access to all resort amenities, and a complimentary dinner.'
			},
			cheapest: {
				price: 600,
				info: 'Offers a cozy beachside room with beautiful views and access to recreational activities.'
			}
		},
		image: '/static/pictures/lagoon_paradise.jpg',
	},
	{
		title: 'Blue Lagoon Inn',
		description: 'A charming inn located near Matira Beach, known for its friendly service and local cuisine.',
		coordinates: { lat: -16.5415, lng: -151.7381 },
		packages: {
			expensive: {
				price: 1200,
				info: 'A spacious suite with ocean views, private dining, and an exclusive island tour.'
			},
			moderate: {
				price: 750,
				info: 'Comfortable accommodation with beach access, breakfast included, and a snorkeling trip.'
			},
			cheapest: {
				price: 500,
				info: 'A standard room with essential amenities, perfect for budget-conscious travelers.'
			}
		},
		image: '/static/pictures/blue_lagoon.jpg',
	},
	{
		title: 'Sunset Beach Bungalows',
		description: 'Beachfront bungalows offering a unique blend of traditional design and modern comfort.',
		coordinates: { lat: -16.5055, lng: -151.7530 },
		packages: {
			expensive: {
				price: 1300,
				info: 'An exclusive bungalow with a private beach area, all meals included, and a sunset cruise.'
			},
			moderate: {
				price: 800,
				info: 'A deluxe bungalow with sea views, complimentary breakfast, and a guided lagoon tour.'
			},
			cheapest: {
				price: 550,
				info: 'A comfortable bungalow with easy beach access and free kayak rentals.'
			}
		},
		image: '/static/pictures/sunset_beach.jpg',
	}
];

export default tanitiAccommodations;
