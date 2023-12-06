import { Destination } from '../types';

const tanitiDestinations: Destination[] = [
	{
		id: 1,
		title: 'Matira Beach',
		description: "Matira Beach, known as Bora Bora's public gem, is famous for its pristine white sands and the crystal-clear turquoise waters of the lagoon. This beach stretches gracefully over a mile and is framed by lush tropical foliage. The beach is a haven for locals and tourists alike, offering a glimpse into the laid-back island lifestyle. Its shallow waters and gentle waves make it perfect for swimming and snorkeling, revealing a rich underwater world. The beach has historical significance as well, once being a key lookout point during World War II. Today, it stands as a serene escape, where the sunsets paint the sky in vibrant hues, creating a mesmerizing spectacle each evening.",
		coordinates: { lat: -16.5436, lng: -151.7385 },
		image: '/static/pictures/matira_beach.jpg',
	},
	{
		id: 2,
		title: 'Mount Otemanu',
		description: "Mount Otemanu, the highest point on Bora Bora, rises majestically to a height of 2,385 feet and is an ancient, extinct volcano. Its rugged, green-clad peaks are shrouded in mystery and local legends, often covered in clouds that add to its mystical allure. Hiking trails lead adventurers through dense tropical forests, offering breathtaking panoramic views of the island and surrounding ocean. The mountain is not just a natural wonder but also a cultural treasure. According to local lore, it is the home of the gods and holds a special place in the hearts of the islanders. The flora and fauna here are as diverse as the tales that surround it, making it a must-visit for those seeking to connect with the island's rich heritage and natural beauty.",
		coordinates: { lat: -16.5142, lng: -151.7731 },
		image: '/static/pictures/mount_otemanu.jpg',
	},
	{
		id: 3,
		title: 'Coral Gardens',
		description: "Nestled between the islets of Motu Piti Uu'uta and Motu Piti Aau on Bora Bora's barrier reef, the Coral Gardens are an underwater spectacle. This shallow reef is a sanctuary for an astonishing variety of marine life, making it a top spot for snorkeling enthusiasts. The gardens boast a vibrant collection of coral formations, teeming with colorful fish, rays, and occasionally even harmless reef sharks. The area’s history is as colorful as its marine inhabitants, with local stories of ancient mariners navigating these waters. The Coral Gardens are not only a place of natural beauty but also a testament to the island's commitment to preserving its delicate underwater ecosystems. It's a surreal, tranquil world, offering an unforgettable experience that allows a rare glimpse into the thriving aquatic life of the South Pacific.",
		coordinates: { lat: -16.532, lng: -151.73 },
		image: '/static/pictures/coral_gardens.jpg',
	},
];

export default tanitiDestinations;
