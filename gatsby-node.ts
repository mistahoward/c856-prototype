import type { GatsbyNode } from 'gatsby';
import Database from 'better-sqlite3';
import path from 'path';
import type { Accommodation, Destination, Review } from './src/types';

interface DbRow {
  id: number | string;
  [key: string]: any;
}

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({
  actions,
  createContentDigest,
  createNodeId,
  reporter,
}) => {
  const { createNode } = actions;
  const dbPath = path.join(__dirname, 'site.db');
  reporter.info(`[gatsby-node] Connecting to SQLite DB at ${dbPath}`);
  let db;
  try {
    db = new Database(dbPath, { readonly: true });
  } catch (err) {
    reporter.panic(`[gatsby-node] Failed to open DB: ${err}`);
    return;
  }

  const accommodationRows: DbRow[] = db.prepare('SELECT * FROM accommodations').all();
  reporter.info(`[gatsby-node] Sourcing ${accommodationRows.length} accommodations`);

  for (const row of accommodationRows) {
    const nodeContent = {
      title: row.title,
      description: row.description,
      coordinates: { lat: row.lat ?? 0, lng: row.lng ?? 0 },
      image: row.image ?? '',
      packages: {
        expensive: {
          price: row.expensive_price ?? 0,
          info: row.expensive_info ?? '',
        },
        moderate: {
          price: row.moderate_price ?? 0,
          info: row.moderate_info ?? '',
        },
        cheapest: {
          price: row.cheapest_price ?? 0,
          info: row.cheapest_info ?? '',
        },
      },
      dbId: row.id,
      link: `/accommodation?${row.id}`,
    };

    createNode({
      ...nodeContent,
      id: createNodeId(`Accommodation-${row.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'AccommodationDirect',
        contentDigest: createContentDigest(nodeContent),
      },
    });
  }

  const destinationRows: DbRow[] = db.prepare('SELECT * FROM destinations').all();
  reporter.info(`[gatsby-node] Sourcing ${destinationRows.length} destinations`);

  for (const row of destinationRows) {
    const nodeContent = {
      title: row.title,
      description: row.description,
      detailed_description: row.detailed_description,
      coordinates: { lat: row.lat ?? 0, lng: row.lng ?? 0 },
      image: row.image ?? '',
      dbId: row.id,
      link: `/destination?${row.id}`,
    };
    
    createNode({
      ...nodeContent,
      id: createNodeId(`Destination-${row.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'DestinationDirect',
        contentDigest: createContentDigest(nodeContent),
      },
    });
  }

  const reviewRows: DbRow[] = db.prepare('SELECT * FROM reviews').all();
  reporter.info(`[gatsby-node] Sourcing ${reviewRows.length} reviews`);
  
  for (const row of reviewRows) {
    const nodeContent = {
      name: row.name,
      age: row.age,
      review: row.review,
      rating: row.rating,
      image: row.image,
      date: row.date,
      dbId: row.id,
    };

    createNode({
      ...nodeContent,
      id: createNodeId(`Review-${row.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'ReviewDirect',
        contentDigest: createContentDigest(nodeContent),
      },
    });
  }

  db.close();
};

// --- Schema customization remains the same ---
// It's good practice to explicitly define your schema.
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type AccommodationDirect implements Node {
      id: ID!
      title: String
      description: String
      coordinates: Coordinates
      image: String
      packages: PricedPackages
      dbId: String
      link: String
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
    type DestinationDirect implements Node {
      id: ID!
      title: String
      description: String
      detailed_description: String
      coordinates: Coordinates
      image: String
      dbId: String
      link: String
    }
    type ReviewDirect implements Node {
      id: ID!
      name: String
      age: Int
      review: String
      rating: Float
      image: String
      date: Float
      dbId: String
    }
  `);
};
