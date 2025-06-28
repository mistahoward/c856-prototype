exports.onCreateWebpackConfig = ({ actions }) => {
	actions.setWebpackConfig({
		resolve: {
			fallback: {
				path: require.resolve('path-browserify'),
				fs: false,
				os: false,
				crypto: false,
				stream: false,
				util: false,
				buffer: false,
				process: false,
			},
		},
	});
}; 