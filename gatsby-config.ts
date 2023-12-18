import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
	siteMetadata: {
		siteUrl: 'https://www.yourdomain.tld',
	},
	// More easily incorporate content into your pages through automatic TypeScript type generation
	// and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [
		'gatsby-plugin-sass',
		'gatsby-plugin-image',
		'gatsby-plugin-sharp',
		'gatsby-plugin-react-leaflet',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'data',
				path: `${__dirname}/src/data/`,
			},
		},
		// {
		// 	resolve: 'gatsby-plugin-local-search',
		// 	options: {
		// 		// A unique name for the search index. This should be descriptive of
		// 		// what the index contains. This is required.
		// 		name: 'pages',

		// 		// Set the search engine to create the index. This is required.
		// 		// The following engines are supported: flexsearch, lunr
		// 		engine: 'flexsearch',

		// 		// Provide options to the engine. This is optional and only recommended
		// 		// for advanced users.
		// 		//
		// 		// Note: Only the flexsearch engine supports options.
		// 		engineOptions: 'speed',

		// 		// GraphQL query used to fetch all data for the search index. This is
		// 		// required.
		// 		query: `
				
		// 	  	`,

		// 		// Field used as the reference value for each document.
		// 		// Default: 'id'.
		// 		ref: 'id',

		// 		// List of keys to index. The values of the keys are taken from the
		// 		// normalizer function below.
		// 		// Default: all fields
		// 		// index: ['title', 'body'],

		// 		// List of keys to store and make available in your UI. The values of
		// 		// the keys are taken from the normalizer function below.
		// 		// Default: all fields
		// 		// store: ['']

		// 		// Function used to map the result from the GraphQL query. This should
		// 		// return an array of items to index in the form of flat objects
		// 		// containing properties to index. The objects must contain the `ref`
		// 		// field above (default: 'id'). This is required.
		// 		normalizer: ({ data }) => {
		// 			data.allSitePage.nodes.map((node) => ({
		// 				id: node.id,
		// 				path: node.path,
		// 				title: node.path,
		// 			}));
		// 			data.allAccommodation.edges.map((node) => ({
		// 				id: node.id,
		// 				path: node.path,
		// 				title: node.title,
		// 			}));
		// 			data.allDestination.edges.map((node) => ({
		// 				id: node.id,
		// 				path: node.path,
		// 				title: node.title,
		// 			}));
		// 			data.allReview.edges.map((node) => ({
		// 				id: node.id,
		// 				path: node.path,
		// 				title: node.title,
		// 			}));
		// 			return data;
		// 		},
		// 	},
	],
};

export default config;
