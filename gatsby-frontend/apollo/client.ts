import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'isomorphic-fetch';
import { auth } from '../src/firebase/config';

const uri = process.env.GATSBY_API_URL || 'http://localhost:8787/';

// Create auth link to add Firebase ID token to requests
const authLink = setContext(async (_, { headers }) => {
	// Get the Firebase ID token if available
	let token = null;

	// Check if we're in the browser and Firebase auth is available
	if (typeof window !== 'undefined' && auth) {
		try {
			const user = auth.currentUser;
			if (user) {
				console.log(
					'Apollo client: Getting ID token for user:',
					user.uid
				);
				token = await user.getIdToken();
				console.log('Apollo client: Token obtained successfully');
			} else {
				console.log('Apollo client: No current user');
			}
		} catch (error) {
			console.error(
				'Apollo client: Error getting Firebase token:',
				error
			);
		}
	}

	// Return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const httpLink = new HttpLink({ uri, fetch });

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: from([authLink, httpLink]),
});
