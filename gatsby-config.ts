import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
	siteMetadata: {
		siteUrl: 'http://alexhoward.dev/c856-prototype',
	},
	flags: {
		DEV_SSR: true
	},
	pathPrefix: '/c856-prototype',
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
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'data',
				path: `${__dirname}/src/data`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: `${__dirname}/src/images`,
			},
		},
	],
};

export default config;
