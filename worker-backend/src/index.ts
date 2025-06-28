import { ApolloServer } from '@apollo/server';
import { startServerAndCreateCloudflareWorkersHandler } from '@as-integrations/cloudflare-workers';
import { gql } from 'graphql-tag';
import { verifyFirebaseToken } from './firebaseVerify.js';

// Define context type
interface Context {
	DB: any;
	currentUser: any;
}

const typeDefs = gql`
	type Query {
		accommodations: [Accommodation]
		accommodation(id: ID!): Accommodation
		destinations: [Destination]
		destination(id: ID!): Destination
		reviews: [Review]
		user(id: ID!): User
		currentUser: User
	}

	type Mutation {
		createUser(input: CreateUserInput!): User
		updateUser(id: ID!, input: UpdateUserInput!): User
		saveFavorite(userId: ID!, type: String!, itemId: ID!): User
		removeFavorite(userId: ID!, type: String!, itemId: ID!): User
		createReview(input: CreateReviewInput!): Review
		updateReview(id: ID!, input: UpdateReviewInput!): Review
		deleteReview(id: ID!): Boolean
	}

	input CreateUserInput {
		firebaseId: String!
		email: String!
		displayName: String
		photoURL: String
	}

	input UpdateUserInput {
		displayName: String
		photoURL: String
	}

	input CreateReviewInput {
		review: String!
		rating: Float!
	}

	input UpdateReviewInput {
		review: String
		rating: Float
	}

	type User {
		id: ID!
		firebaseId: String!
		email: String!
		displayName: String
		photoURL: String
		favorites: [Favorite]
		reviews: [Review]
		createdAt: String
		updatedAt: String
	}

	type Favorite {
		id: ID!
		userId: ID!
		type: String!
		itemId: ID!
		item: FavoriteItem
		createdAt: String
	}

	type FavoriteItem {
		id: ID!
		title: String
		description: String
		image: String
	}

	type Accommodation {
		id: ID!
		title: String
		description: String
		coordinates: Coordinates
		image: String
		packages: PricedPackages
	}
	type Coordinates {
		lat: Float
		lng: Float
	}
	type Package {
		price: Int
		info: String
	}
	type PricedPackages {
		expensive: Package
		moderate: Package
		cheapest: Package
	}
	type Destination {
		id: ID!
		title: String
		description: String
		detailed_description: String
		coordinates: Coordinates
		image: String
	}
	type Review {
		id: ID!
		user: User
		userId: ID
		name: String
		age: Int
		review: String
		rating: Float
		image: String
		date: Float
	}
`;

const resolvers = {
	Query: {
		/**
		 * Retrieves all accommodations from the database
		 * Maps database rows to GraphQL schema format with coordinates and packages
		 */
		accommodations: async (_, _2, context) => {
			const { results } = await context.DB.prepare(
				'SELECT * FROM accommodations'
			).all();
			return results.map(row => ({
				id: row.id,
				title: row.title,
				description: row.description,
				coordinates: { lat: row.lat, lng: row.lng },
				image: row.image,
				packages: {
					expensive: {
						price: row.expensive_price,
						info: row.expensive_info,
					},
					moderate: {
						price: row.moderate_price,
						info: row.moderate_info,
					},
					cheapest: {
						price: row.cheapest_price,
						info: row.cheapest_info,
					},
				},
			}));
		},
		/**
		 * Retrieves a specific accommodation by ID
		 * @param id - The accommodation ID to retrieve
		 */
		accommodation: async (parent, { id }, context) => {
			const result = await context.DB.prepare(
				'SELECT * FROM accommodations WHERE id = ?'
			)
				.bind(id)
				.first();

			if (!result) return null;

			return {
				id: result.id,
				title: result.title,
				description: result.description,
				coordinates: { lat: result.lat, lng: result.lng },
				image: result.image,
				packages: {
					expensive: {
						price: result.expensive_price,
						info: result.expensive_info,
					},
					moderate: {
						price: result.moderate_price,
						info: result.moderate_info,
					},
					cheapest: {
						price: result.cheapest_price,
						info: result.cheapest_info,
					},
				},
			};
		},
		/**
		 * Retrieves all destinations from the database
		 * Maps database rows to include coordinates object
		 */
		destinations: async (_, _2, context) => {
			const { results } = await context.DB.prepare(
				'SELECT * FROM destinations'
			).all();
			return results.map(row => ({
				...row,
				coordinates: { lat: row.lat, lng: row.lng },
			}));
		},
		/**
		 * Retrieves a specific destination by ID
		 * @param id - The destination ID to retrieve
		 */
		destination: async (_, { id }, context) => {
			const result = await context.DB.prepare(
				'SELECT * FROM destinations WHERE id = ?'
			)
				.bind(id)
				.first();

			if (!result) return null;

			return {
				...result,
				coordinates: { lat: result.lat, lng: result.lng },
			};
		},
		/**
		 * Retrieves all reviews from the database
		 */
		reviews: async (_, _2, context) => {
			const { results } = await context.DB.prepare(
				'SELECT * FROM reviews'
			).all();
			return results;
		},
		/**
		 * Retrieves a specific user by ID
		 * @param id - The user ID to retrieve
		 */
		user: async (_, { id }, context) => {
			const result = await context.DB.prepare(
				'SELECT * FROM users WHERE id = ?'
			)
				.bind(id)
				.first();

			if (!result) return null;

			return result;
		},
		/**
		 * Retrieves the currently authenticated user
		 * TODO: Implement authentication token parsing
		 */
		currentUser: async (_, _2, context) => {
			// TODO: Get user from auth token
			return null;
		},
	},
	Mutation: {
		/**
		 * Creates a new user in the database
		 * @param input - User creation data including firebaseId, email, displayName, and photoURL
		 */
		createUser: async (_, { input }, context) => {
			const { firebaseId, email, displayName, photoURL } = input;

			const result = await context.DB.prepare(
				`
        INSERT INTO users (firebase_id, email, display_name, photo_url, created_at, updated_at)
        VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
        RETURNING *
      `
			)
				.bind(firebaseId, email, displayName, photoURL)
				.first();

			return result;
		},
		/**
		 * Updates an existing user's information
		 * @param id - The user ID to update
		 * @param input - User update data including displayName and photoURL
		 */
		updateUser: async (_, { id, input }, context) => {
			const { displayName, photoURL } = input;

			const result = await context.DB.prepare(
				`
        UPDATE users 
        SET display_name = ?, photo_url = ?, updated_at = datetime('now')
        WHERE id = ?
        RETURNING *
      `
			)
				.bind(displayName, photoURL, id)
				.first();

			return result;
		},
		/**
		 * Saves a favorite item for a user
		 * Uses INSERT OR IGNORE to prevent duplicate favorites
		 * @param userId - The user ID
		 * @param type - The type of item (accommodation, destination, etc.)
		 * @param itemId - The ID of the item to favorite
		 */
		saveFavorite: async (_, { userId, type, itemId }, context) => {
			await context.DB.prepare(
				`
        INSERT OR IGNORE INTO favorites (user_id, type, item_id, created_at)
        VALUES (?, ?, ?, datetime('now'))
      `
			)
				.bind(userId, type, itemId)
				.run();

			return await context.DB.prepare('SELECT * FROM users WHERE id = ?')
				.bind(userId)
				.first();
		},
		/**
		 * Removes a favorite item for a user
		 * @param userId - The user ID
		 * @param type - The type of item
		 * @param itemId - The ID of the item to remove from favorites
		 */
		removeFavorite: async (_, { userId, type, itemId }, context) => {
			await context.DB.prepare(
				`
        DELETE FROM favorites 
        WHERE user_id = ? AND type = ? AND item_id = ?
      `
			)
				.bind(userId, type, itemId)
				.run();

			return await context.DB.prepare('SELECT * FROM users WHERE id = ?')
				.bind(userId)
				.first();
		},
		/**
		 * Creates a new review
		 * Requires authentication and associates the review with the current user
		 * @param input - Review creation data including review text and rating
		 */
		createReview: async (_, { input }, context) => {
			const { review, rating } = input;
			if (!context.currentUser)
				throw new Error('Authentication required to create a review');

			const result = await context.DB.prepare(
				`INSERT INTO reviews (user_id, review, rating, date)
				 VALUES (?, ?, ?, ?)
				 RETURNING *`
			)
				.bind(context.currentUser.id, review, rating, Date.now())
				.first();

			// Always fetch the user from the DB to ensure consistency
			return { ...result, userId: result.user_id };
		},
		/**
		 * Updates an existing review
		 * Requires authentication and ensures the user owns the review
		 * @param id - The review ID to update
		 * @param input - Review update data including review text and rating
		 */
		updateReview: async (_, { id, input }, context) => {
			const { review, rating } = input;

			if (!context.currentUser) {
				throw new Error('Authentication required to update a review');
			}

			// Check if the review belongs to the current user
			const existingReview = await context.DB.prepare(
				'SELECT * FROM reviews WHERE id = ? AND user_id = ?'
			)
				.bind(id, context.currentUser.id)
				.first();

			if (!existingReview) {
				throw new Error(
					'Review not found or you do not have permission to update it'
				);
			}

			const result = await context.DB.prepare(
				`
        UPDATE reviews 
        SET review = ?, rating = ?
        WHERE id = ? AND user_id = ?
        RETURNING *
      `
			)
				.bind(review, rating, id, context.currentUser.id)
				.first();

			return result;
		},
		/**
		 * Deletes a review
		 * Requires authentication and ensures the user owns the review (unless super admin)
		 * @param id - The review ID to delete
		 */
		deleteReview: async (_, { id }, context) => {
			if (!context.currentUser) {
				throw new Error('Authentication required to delete a review');
			}

			const isSuperAdmin = false;

			let existingReview;
			if (isSuperAdmin) {
				existingReview = await context.DB.prepare(
					'SELECT * FROM reviews WHERE id = ?'
				)
					.bind(id)
					.first();
			} else {
				existingReview = await context.DB.prepare(
					'SELECT * FROM reviews WHERE id = ? AND user_id = ?'
				)
					.bind(id, context.currentUser.id)
					.first();
			}

			if (!existingReview) {
				throw new Error(
					'Review not found or you do not have permission to delete it'
				);
			}

			if (isSuperAdmin) {
				await context.DB.prepare('DELETE FROM reviews WHERE id = ?')
					.bind(id)
					.run();
			} else {
				await context.DB.prepare(
					'DELETE FROM reviews WHERE id = ? AND user_id = ?'
				)
					.bind(id, context.currentUser.id)
					.run();
			}

			return true;
		},
	},
	User: {
		/**
		 * Retrieves all favorites for a user
		 */
		favorites: async (parent, _, context) => {
			const { results } = await context.DB.prepare(
				`SELECT * FROM favorites WHERE user_id = ?`
			)
				.bind(parent.id)
				.all();
			return results;
		},
		/**
		 * Retrieves all reviews for a user
		 */
		reviews: async (parent, _, context) => {
			const { results } = await context.DB.prepare(
				`SELECT * FROM reviews WHERE user_id = ?`
			)
				.bind(parent.id)
				.all();
			return results;
		},
		/**
		 * Maps display_name field to displayName for GraphQL schema
		 */
		displayName: parent => parent.display_name,
		/**
		 * Maps photo_url field to photoURL for GraphQL schema
		 */
		photoURL: parent => parent.photo_url,
		/**
		 * Maps firebase_id field to firebaseId for GraphQL schema
		 */
		firebaseId: parent => parent.firebase_id,
	},
	Favorite: {
		/**
		 * Retrieves the associated item for a favorite
		 * Supports both accommodation and destination types
		 */
		item: async (parent, _, context) => {
			const { type, itemId } = parent;

			if (type === 'accommodation') {
				return await context.DB.prepare(
					'SELECT * FROM accommodations WHERE id = ?'
				)
					.bind(itemId)
					.first();
			} else if (type === 'destination') {
				return await context.DB.prepare(
					'SELECT * FROM destinations WHERE id = ?'
				)
					.bind(itemId)
					.first();
			}

			return null;
		},
	},
	Review: {
		/**
		 * Retrieves the user who wrote the review
		 * Handles both userId and user_id field variations
		 */
		user: async (parent, _, context) => {
			const userId = parent.userId || parent.user_id;
			if (!userId) return null;
			const result = await context.DB.prepare(
				'SELECT * FROM users WHERE id = ?'
			)
				.bind(userId)
				.first();
			return result;
		},
	},
};

const server = new ApolloServer<Context>({
	typeDefs,
	resolvers,
});

const corsHeaders = {
	'Access-Control-Allow-Origin': process.env.GATSBY_FRONTEND_URL,
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Apollo handler with authentication context
 * Verifies Firebase tokens and sets up user context for GraphQL operations
 */
const apolloHandler = startServerAndCreateCloudflareWorkersHandler(
	server as any,
	{
		context: async ({
			env,
			request,
		}: {
			env: any;
			request: Request;
		}): Promise<Context> => {
			let currentUser = null;
			const authHeader = request.headers.get('Authorization');
			console.log('Backend: Auth header present:', !!authHeader);

			if (authHeader && authHeader.startsWith('Bearer ')) {
				const idToken = authHeader.substring(7);
				console.log('Backend: Token received, length:', idToken.length);
				try {
					const projectId =
						env.FIREBASE_PROJECT_ID ||
						process.env.FIREBASE_PROJECT_ID ||
						'c868-fdbb3';
					console.log('Backend: Using project ID:', projectId);
					const payload = await verifyFirebaseToken(
						idToken,
						projectId
					);
					console.log(
						'Backend: Token verified, user_id:',
						payload.user_id
					);
					// Find or create user in DB by firebaseId (payload.user_id)
					const userResult = await env.DB.prepare(
						'SELECT * FROM users WHERE firebase_id = ?'
					)
						.bind(payload.user_id)
						.first();
					if (userResult) {
						currentUser = userResult;
						console.log(
							'Backend: User found in DB:',
							userResult.id
						);
					} else {
						console.log(
							'Backend: User not found in DB for firebase_id:',
							payload.user_id
						);
					}
				} catch (err) {
					console.error('Backend: Token verification failed:', err);
				}
			}
			return { DB: env.DB, currentUser };
		},
	}
);

/**
 * Main Cloudflare Worker handler
 * Routes requests to appropriate endpoints and handles CORS
 */
export default {
	async fetch(request: Request, env: any, ctx: any) {
		const url = new URL(request.url);

		if (request.method === 'OPTIONS')
			return new Response(null, { headers: corsHeaders });

		switch (url.pathname) {
			case '/test': {
				const data = {
					message: 'CORS test successful!',
					timestamp: new Date(),
				};
				return new Response(JSON.stringify(data), {
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders,
					},
				});
			}

			case '/':
			case '/graphql': {
				const response = await apolloHandler(request, env, ctx);
				const responseHeaders = new Headers(response.headers);
				Object.entries(corsHeaders).forEach(([key, value]) => {
					if (value) responseHeaders.set(key, value);
				});

				return new Response(response.body, {
					status: response.status,
					statusText: response.statusText,
					headers: responseHeaders,
				});
			}

			default:
				return new Response('Not Found', { status: 404 });
		}
	},
};
