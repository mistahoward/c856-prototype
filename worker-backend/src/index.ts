import { ApolloServer } from '@apollo/server';
import { startServerAndCreateCloudflareWorkersHandler } from '@as-integrations/cloudflare-workers';
import { gql } from 'graphql-tag';

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

	type User {
		id: ID!
		firebaseId: String!
		email: String!
		displayName: String
		photoURL: String
		favorites: [Favorite]
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
		destinations: async (_, _2, context) => {
			const { results } = await context.DB.prepare(
				'SELECT * FROM destinations'
			).all();
			return results.map(row => ({
				...row,
				coordinates: { lat: row.lat, lng: row.lng },
			}));
		},
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
		reviews: async (_, _2, context) => {
			const { results } = await context.DB.prepare(
				'SELECT * FROM reviews'
			).all();
			return results;
		},
		user: async (_, { id }, context) => {
			const result = await context.DB.prepare(
				'SELECT * FROM users WHERE id = ?'
			)
				.bind(id)
				.first();

			if (!result) return null;

			return result;
		},
		currentUser: async (_, _2, context) => {
			// TODO: Get user from auth token
			return null;
		},
	},
	Mutation: {
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
	},
	User: {
		favorites: async (parent, _, context) => {
			const { results } = await context.DB.prepare(
				`
        SELECT * FROM favorites WHERE user_id = ?
      `
			)
				.bind(parent.id)
				.all();

			return results;
		},
	},
	Favorite: {
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
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const corsHeaders = {
	'Access-Control-Allow-Origin':
		process.env.NODE_ENV === 'production'
			? process.env.GATSBY_FRONTEND_URL
			: 'http://localhost:8000',
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const apolloHandler = startServerAndCreateCloudflareWorkersHandler(server, {
	context: async ({ env }: { env: any }) => ({ DB: env.DB }),
});

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
