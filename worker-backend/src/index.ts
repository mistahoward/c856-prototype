import { ApolloServer } from '@apollo/server';
import { startServerAndCreateCloudflareWorkersHandler } from '@as-integrations/cloudflare-workers'; 
import { gql } from 'graphql-tag';

const typeDefs = gql`type Query {
    accommodations: [Accommodation]
    destinations: [Destination]
    reviews: [Review]
  }
  type Accommodation {
    id: ID!
    title: String
    description: String
    coordinates: Coordinates
    image: String
    packages: PricedPackages
  }
  type Coordinates { lat: Float, lng: Float }
  type Package { price: Int, info: String }
  type PricedPackages { expensive: Package, moderate: Package, cheapest: Package }
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
      const { results } = await context.DB.prepare('SELECT * FROM accommodations').all();
      return results.map(row => ({
        id: row.id,
        title: row.title,
        description: row.description,
        coordinates: { lat: row.lat, lng: row.lng },
        image: row.image,
        packages: {
          expensive: { price: row.expensive_price, info: row.expensive_info },
          moderate: { price: row.moderate_price, info: row.moderate_info },
          cheapest: { price: row.cheapest_price, info: row.cheapest_info },
        },
      }));
    },
    accommodation: async (parent, { id }, context) => {
      // Find a single row in the database where the ID matches
      const result = await context.DB.prepare('SELECT * FROM accommodations WHERE id = ?')
        .bind(id)
        .first();
    
      if (!result) 
        return null;
      
      return {
        ...result,
        packages: {
          expensive: { price: result.expensive_price, info: result.expensive_info },
          moderate: { price: result.moderate_price, info: result.moderate_info },
          cheapest: { price: result.cheapest_price, info: result.cheapest_info },
        },
        coordinates: { lat: result.lat, lng: result.lng },
      };
    },
    destinations: async (_, _2, context) => {
        const { results } = await context.DB.prepare('SELECT * FROM destinations').all();
        return results.map(row => ({ ...row, coordinates: { lat: row.lat, lng: row.lng } }));
    },
    destination: async (_, { id }, context) => {
      const result = await context.DB.prepare('SELECT * FROM destinations WHERE id = ?')
        .bind(id)
        .first();
      
      if (!result) return null;
      
      return { ...result, coordinates: { lat: result.lat, lng: result.lng } };
    },
    reviews: async (_, _2, context) => {
        const { results } = await context.DB.prepare('SELECT * FROM reviews').all();
        return results;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateCloudflareWorkersHandler(server, {
    context: async ({ env }: { env: any }) => {
        return {
            DB: env.DB,
        };
    },
});