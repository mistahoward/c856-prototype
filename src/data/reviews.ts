import type { Review } from '../types';

export const epochToReadableDate = (epoch: EpochTimeStamp) => {
	const date = new Date(epoch);
	return date.toLocaleDateString('en-US', {
		month: 'long',
		day: '2-digit',
		year: 'numeric',
	});
};

const tanitiReviews: Review[] = [
	{
		name: 'John Doe',
		age: 32,
		review: 'An absolutely breathtaking experience! The scenic beauty was unparalleled, and the local cuisine was delightful. Would definitely recommend to anyone looking for an adventure.',
		rating: 5,
		image: '/c856-prototype/images/john_doe.jpg',
		date: 1673036400000,
	},
	{
		name: 'Emily Smith',
		age: 28,
		review: "A truly magical place. The sunsets are incredible, and the people are so welcoming. The only downside was the humidity, but it's a small price to pay for such beauty.",
		rating: 4.5,
		image: '/c856-prototype/images/emily_smith.jpg',
		date: 1675628400000,
	},
	{
		name: 'Carlos Rodriguez',
		age: 45,
		review: "The perfect getaway for our anniversary. The island's charm and the luxurious resort made our stay unforgettable. The guided tours were informative and engaging.",
		rating: 5,
		image: '/c856-prototype/images/carlos_rodriguez.jpg',
		date: 1681302000000,
	},
	{
		name: 'Aisha Khan',
		age: 30,
		review: "As an avid traveler, I've seen many places, but this island stole my heart. The lush forests and pristine beaches are a nature lover's dream. However, the nightlife was a bit lacking.",
		rating: 4,
		image: '/c856-prototype/images/aisha_khan.jpg',
		date: 1683894000000,
	},
];

export default tanitiReviews;
