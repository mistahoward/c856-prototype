import tanitiReviews from './src/data/reviews.ts';
import tanitiAccommodations from './src/data/accommodations.ts';
import tanitiDestinations from './src/data/destinations.ts';

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
	const { createNode } = actions;

	tanitiReviews.forEach((review) => {
		const nodeMeta = {
			id: createNodeId(`review-${review.name}`),
			parent: null,
			children: [],
			internal: {
				type: 'Review',
				mediaType: 'text/html',
				contentDigest: createContentDigest(review),
			},
			link: '/reviews'
		};

		const node = { ...review, ...nodeMeta };
		createNode(node);
	});

	tanitiAccommodations.forEach((accommodation) => {
		const nodeMeta = {
			id: createNodeId(`accommodation-${accommodation.title}`),
			parent: null,
			children: [],
			internal: {
				type: 'Accommodation',
				mediaType: 'text/html',
				contentDigest: createContentDigest(accommodation),
			},
			link: `/accommodation/?${accommodation.id}`,
		};

		const node = { ...accommodation, ...nodeMeta };
		createNode(node);
	});

	tanitiDestinations.forEach((destination) => {
		const nodeMeta = {
			id: createNodeId(`destination-${destination.title}`),
			parent: null,
			children: [],
			internal: {
				type: 'Destination',
				mediaType: 'text/html',
				contentDigest: createContentDigest(destination),
			},
			link: `/destination/?${destination.id}`,
		};

		const node = { ...destination, ...nodeMeta };
		createNode(node);
	});
};
