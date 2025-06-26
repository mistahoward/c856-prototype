import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

let __dirname = path.dirname(new URL(import.meta.url).pathname);
if (process.platform === 'win32' && __dirname.startsWith('/')) {
  __dirname = __dirname.slice(1);
}

const accommodations = [
  {
    id: 1,
    title: 'Lagoon Paradise Resort',
    description: 'A luxurious resort offering overwater bungalows with stunning views of the lagoon.',
    coordinates: { lat: -16.4990, lng: -151.7370 },
    packages: {
      expensive: {
        price: 1500,
        info: 'Includes a private villa, gourmet dining, spa treatments, and a personal tour guide.'
      },
      moderate: {
        price: 950,
        info: 'Features an overwater bungalow, access to all resort amenities, and a complimentary dinner.'
      },
      cheapest: {
        price: 600,
        info: 'Offers a cozy beachside room with beautiful views and access to recreational activities.'
      }
    },
    image: 'lagoon_paradise.jpg',
  },
  {
    id: 2,
    title: 'Blue Lagoon Inn',
    description: 'A charming inn located near Matira Beach, known for its friendly service and local cuisine.',
    coordinates: { lat: -16.5415, lng: -151.7381 },
    packages: {
      expensive: {
        price: 1200,
        info: 'A spacious suite with ocean views, private dining, and an exclusive island tour.'
      },
      moderate: {
        price: 750,
        info: 'Comfortable accommodation with beach access, breakfast included, and a snorkeling trip.'
      },
      cheapest: {
        price: 500,
        info: 'A standard room with essential amenities, perfect for budget-conscious travelers.'
      }
    },
    image: 'blue_lagoon.jpg',
  },
  {
    id: 3,
    title: 'Sunset Beach Bungalows',
    description: 'Beachfront bungalows offering a unique blend of traditional design and modern comfort.',
    coordinates: { lat: -16.5055, lng: -151.7530 },
    packages: {
      expensive: {
        price: 1300,
        info: 'An exclusive bungalow with a private beach area, all meals included, and a sunset cruise.'
      },
      moderate: {
        price: 800,
        info: 'A deluxe bungalow with sea views, complimentary breakfast, and a guided lagoon tour.'
      },
      cheapest: {
        price: 550,
        info: 'A comfortable bungalow with easy beach access and free kayak rentals.'
      }
    },
    image: 'sunset_beach.jpg',
  }
];

const destinations = [
  {
    id: 1,
    title: 'Matira Beach',
    detailed_description:
      "Matira Beach, known as Taniti's public gem, is famous for its pristine white sands and the crystal-clear turquoise waters of the lagoon. This beach stretches gracefully over a mile and is framed by lush tropical foliage. The beach is a haven for locals and tourists alike, offering a glimpse into the laid-back island lifestyle. Its shallow waters and gentle waves make it perfect for swimming and snorkeling, revealing a rich underwater world. The beach has historical significance as well, once being a key lookout point during World War II. Today, it stands as a serene escape, where the sunsets paint the sky in vibrant hues, creating a mesmerizing spectacle each evening.",
    description:
      "Matira Beach offers a mile of white sands and clear waters, ideal for swimming, snorkeling, and experiencing Taniti's beauty.",
    coordinates: { lat: -16.5436, lng: -151.7385 },
    image: 'matira_beach.jpg',
  },
  {
    id: 2,
    title: 'Mount Otemanu',
    detailed_description:
      "Mount Otemanu, the highest point on Taniti, rises majestically to a height of 2,385 feet and is an ancient, extinct volcano. Its rugged, green-clad peaks are shrouded in mystery and local legends, often covered in clouds that add to its mystical allure. Hiking trails lead adventurers through dense tropical forests, offering breathtaking panoramic views of the island and surrounding ocean. The mountain is not just a natural wonder but also a cultural treasure. According to local lore, it is the home of the gods and holds a special place in the hearts of the islanders. The flora and fauna here are as diverse as the tales that surround it, making it a must-visit for those seeking to connect with the island's rich heritage and natural beauty.",
    description:
      'Mount Otemanu, a mystical extinct volcano, offers hiking trails and panoramic views, rich in natural and cultural significance.',
    coordinates: { lat: -16.5142, lng: -151.7731 },
    image: 'mount_otemanu.jpg',
  },
  {
    id: 3,
    title: 'Coral Gardens',
    detailed_description:
      "Nestled between the islets of Motu Piti Uu'uta and Motu Piti Aau on Taniti's barrier reef, the Coral Gardens are an underwater spectacle. This shallow reef is a sanctuary for an astonishing variety of marine life, making it a top spot for snorkeling enthusiasts. The gardens boast a vibrant collection of coral formations, teeming with colorful fish, rays, and occasionally even harmless reef sharks. The area's history is as colorful as its marine inhabitants, with local stories of ancient mariners navigating these waters. The Coral Gardens are not only a place of natural beauty but also a testament to the island's commitment to preserving its delicate underwater ecosystems. It's a surreal, tranquil world, offering an unforgettable experience that allows a rare glimpse into the thriving aquatic life of the South Pacific.",
    description:
      "The Coral Gardens, a snorkeling paradise, feature a rich marine life amidst vibrant coral formations in Taniti's barrier reef.",
    coordinates: { lat: -16.532, lng: -151.73 },
    image: 'coral_gardens.jpg',
  },
];
const reviews = [
  {
    name: 'John Doe',
    age: 32,
    review: 'An absolutely breathtaking experience! The scenic beauty was unparalleled, and the local cuisine was delightful. Would definitely recommend to anyone looking for an adventure.',
    rating: 5,
    image: 'john_doe.jpg',
    date: 1673036400000,
  },
  {
    name: 'Emily Smith',
    age: 28,
    review: "A truly magical place. The sunsets are incredible, and the people are so welcoming. The only downside was the humidity, but it's a small price to pay for such beauty.",
    rating: 4.5,
    image: 'emily_smith.jpg',
    date: 1675628400000,
  },
  {
    name: 'Carlos Rodriguez',
    age: 45,
    review: "The perfect getaway for our anniversary. The island's charm and the luxurious resort made our stay unforgettable. The guided tours were informative and engaging.",
    rating: 5,
    image: 'carlos_rodriguez.jpg',
    date: 1681302000000,
  },
  {
    name: 'Aisha Khan',
    age: 30,
    review: "As an avid traveler, I've seen many places, but this island stole my heart. The lush forests and pristine beaches are a nature lover's dream. However, the nightlife was a bit lacking.",
    rating: 4,
    image: 'aisha_khan.jpg',
    date: 1683894000000,
  },
];

async function seedDatabase(dbPath = path.join(__dirname, '../site.db')) {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec('DROP TABLE IF EXISTS accommodations');
  await db.exec('DROP TABLE IF EXISTS destinations');
  await db.exec('DROP TABLE IF EXISTS reviews');

  await db.exec(`
    CREATE TABLE accommodations (
      id INTEGER PRIMARY KEY,
      title TEXT,
      description TEXT,
      lat REAL,
      lng REAL,
      image TEXT,
      expensive_price INTEGER,
      expensive_info TEXT,
      moderate_price INTEGER,
      moderate_info TEXT,
      cheapest_price INTEGER,
      cheapest_info TEXT
    )
  `);
  await db.exec(`
    CREATE TABLE destinations (
      id INTEGER PRIMARY KEY,
      title TEXT,
      description TEXT,
      detailed_description TEXT,
      lat REAL,
      lng REAL,
      image TEXT
    )
  `);
  await db.exec(`
    CREATE TABLE reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER,
      review TEXT,
      rating REAL,
      image TEXT,
      date INTEGER
    )
  `);

  // Insert accommodations
  for (const acc of accommodations) {
    await db.run(
      `INSERT INTO accommodations (id, title, description, lat, lng, image, expensive_price, expensive_info, moderate_price, moderate_info, cheapest_price, cheapest_info)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      acc.id,
      acc.title,
      acc.description,
      acc.coordinates.lat,
      acc.coordinates.lng,
      acc.image,
      acc.packages.expensive.price,
      acc.packages.expensive.info,
      acc.packages.moderate.price,
      acc.packages.moderate.info,
      acc.packages.cheapest.price,
      acc.packages.cheapest.info
    );
  }

  // Insert destinations
  for (const dest of destinations) {
    await db.run(
      `INSERT INTO destinations (id, title, description, detailed_description, lat, lng, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      dest.id,
      dest.title,
      dest.description,
      dest.detailed_description,
      dest.coordinates.lat,
      dest.coordinates.lng,
      dest.image
    );
  }

  // Insert reviews
  for (const rev of reviews) {
    await db.run(
      `INSERT INTO reviews (name, age, review, rating, image, date)
      VALUES (?, ?, ?, ?, ?, ?)`,
      rev.name,
      rev.age,
      rev.review,
      rev.rating,
      rev.image,
      rev.date
    );
  }

  await db.close();
  console.log('Database seeded successfully!');
}

seedDatabase().catch((err) => {
  console.error('Failed to seed database:', err);
  process.exit(1);
}); 