import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const isRemote = args.includes('--remote');

const accommodations = [
    {
      id: 1, title: 'Lagoon Paradise Resort', description: 'A luxurious resort offering overwater bungalows with stunning views of the lagoon.',
      lat: -16.4990, lng: -151.7370, image: 'lagoon_paradise.jpg',
      expensive_price: 1500, expensive_info: 'Includes a private villa, gourmet dining, spa treatments, and a personal tour guide.',
      moderate_price: 950, moderate_info: 'Features an overwater bungalow, access to all resort amenities, and a complimentary dinner.',
      cheapest_price: 600, cheapest_info: 'Offers a cozy beachside room with beautiful views and access to recreational activities.'
    },
    {
      id: 2, title: 'Blue Lagoon Inn', description: 'A charming inn located near Matira Beach, known for its friendly service and local cuisine.',
      lat: -16.5415, lng: -151.7381, image: 'blue_lagoon.jpg',
      expensive_price: 1200, expensive_info: 'A spacious suite with ocean views, private dining, and an exclusive island tour.',
      moderate_price: 750, moderate_info: 'Comfortable accommodation with beach access, breakfast included, and a snorkeling trip.',
      cheapest_price: 500, cheapest_info: 'A standard room with essential amenities, perfect for budget-conscious travelers.'
    },
    {
      id: 3, title: 'Sunset Beach Bungalows', description: 'Beachfront bungalows offering a unique blend of traditional design and modern comfort.',
      lat: -16.5055, lng: -151.7530, image: 'sunset_beach.jpg',
      expensive_price: 1300, expensive_info: 'An exclusive bungalow with a private beach area, all meals included, and a sunset cruise.',
      moderate_price: 800, moderate_info: 'A deluxe bungalow with sea views, complimentary breakfast, and a guided lagoon tour.',
      cheapest_price: 550, cheapest_info: 'A comfortable bungalow with easy beach access and free kayak rentals.'
    }
];

const destinations = [
    {
      id: 1, title: 'Matira Beach',
      description: "Matira Beach offers a mile of white sands and clear waters, ideal for swimming, snorkeling, and experiencing Taniti's beauty.",
      detailed_description: "Matira Beach, known as Taniti's public gem, is famous for its pristine white sands and the crystal-clear turquoise waters of the lagoon. This beach stretches gracefully over a mile and is framed by lush tropical foliage. The beach is a haven for locals and tourists alike, offering a glimpse into the laid-back island lifestyle. Its shallow waters and gentle waves make it perfect for swimming and snorkeling, revealing a rich underwater world. The beach has historical significance as well, once being a key lookout point during World War II. Today, it stands as a serene escape, where the sunsets paint the sky in vibrant hues, creating a mesmerizing spectacle each evening.",
      lat: -16.5436, lng: -151.7385, image: 'matira_beach.jpg'
    },
    {
      id: 2, title: 'Mount Otemanu',
      description: 'Mount Otemanu, a mystical extinct volcano, offers hiking trails and panoramic views, rich in natural and cultural significance.',
      detailed_description: "Mount Otemanu, the highest point on Taniti, rises majestically to a height of 2,385 feet and is an ancient, extinct volcano. Its rugged, green-clad peaks are shrouded in mystery and local legends, often covered in clouds that add to its mystical allure. Hiking trails lead adventurers through dense tropical forests, offering breathtaking panoramic views of the island and surrounding ocean. The mountain is not just a natural wonder but also a cultural treasure. According to local lore, it is the home of the gods and holds a special place in the hearts of the islanders. The flora and fauna here are as diverse as the tales that surround it, making it a must-visit for those seeking to connect with the island's rich heritage and natural beauty.",
      lat: -16.5142, lng: -151.7731, image: 'mount_otemanu.jpg'
    },
    {
      id: 3, title: 'Coral Gardens',
      description: "The Coral Gardens, a snorkeling paradise, feature a rich marine life amidst vibrant coral formations in Taniti's barrier reef.",
      detailed_description: "Nestled between the islets of Motu Piti Uu'uta and Motu Piti Aau on Taniti's barrier reef, the Coral Gardens are an underwater spectacle. This shallow reef is a sanctuary for an astonishing variety of marine life, making it a top spot for snorkeling enthusiasts. The gardens boast a vibrant collection of coral formations, teeming with colorful fish, rays, and occasionally even harmless reef sharks. The area's history is as colorful as its marine inhabitants, with local stories of ancient mariners navigating these waters. The Coral Gardens are not only a place of natural beauty but also a testament to the island's commitment to preserving its delicate underwater ecosystems. It's a surreal, tranquil world, offering an unforgettable experience that allows a rare glimpse into the thriving aquatic life of the South Pacific.",
      lat: -16.532, lng: -151.73, image: 'coral_gardens.jpg'
    }
];

const reviews = [
    { name: 'John Doe', age: 32, review: 'An absolutely breathtaking experience! The scenic beauty was unparalleled, and the local cuisine was delightful. Would definitely recommend to anyone looking for an adventure.', rating: 5, image: 'john_doe.jpg', date: 1673036400000 },
    { name: 'Emily Smith', age: 28, review: "A truly magical place. The sunsets are incredible, and the people are so welcoming. The only downside was the humidity, but it's a small price to pay for such beauty.", rating: 4.5, image: 'emily_smith.jpg', date: 1675628400000 },
    { name: 'Carlos Rodriguez', age: 45, review: "The perfect getaway for our anniversary. The island's charm and the luxurious resort made our stay unforgettable. The guided tours were informative and engaging.", rating: 5, image: 'carlos_rodriguez.jpg', date: 1681302000000 },
    { name: 'Aisha Khan', age: 30, review: "As an avid traveler, I've seen many places, but this island stole my heart. The lush forests and pristine beaches are a nature lover's dream. However, the nightlife was a bit lacking.", rating: 4, image: 'aisha_khan.jpg', date: 1683894000000 }
];


const dbName = 'c856-database';
const tempSqlFile = path.join(__dirname, 'temp_insert.sql');

/**
 * Executes a shell command synchronously and logs the command being executed
 * @param {string} command - The shell command to execute
 * @returns {void} Executes the command and inherits stdio streams
 */
const run = (command: string) => {
    // Add --remote flag to wrangler commands if specified
    if (isRemote && command.includes('wrangler')) {
        command = command.replace('wrangler', 'wrangler --remote');
    }
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
}

/**
 * Escapes single quotes in a string for safe SQL insertion
 * @param str - The string to escape
 * @returns The escaped string with single quotes doubled
 */
const escapeSql = (str: string) => str.replace(/'/g, "''");

try {
    console.log(`--- Database Seeding Script ---`);
    console.log(`Mode: ${isRemote ? 'Remote' : 'Local'}`);
    console.log('--- Applying schema ---');
    run(`npx wrangler d1 execute ${dbName} --file=./schema.sql`);

    console.log('\n--- Seeding Accommodations ---');
    for (const item of accommodations) {
        const query = `INSERT INTO accommodations (id, title, description, lat, lng, image, expensive_price, expensive_info, moderate_price, moderate_info, cheapest_price, cheapest_info) VALUES (${item.id}, '${escapeSql(item.title)}', '${escapeSql(item.description)}', ${item.lat}, ${item.lng}, '${escapeSql(item.image)}', ${item.expensive_price}, '${escapeSql(item.expensive_info)}', ${item.moderate_price}, '${escapeSql(item.moderate_info)}', ${item.cheapest_price}, '${escapeSql(item.cheapest_info)}');`;
        fs.writeFileSync(tempSqlFile, query);
        run(`npx wrangler d1 execute ${dbName} --file=${tempSqlFile}`);
    }

    console.log('\n--- Seeding Destinations ---');
    for (const item of destinations) {
        const query = `INSERT INTO destinations (id, title, description, detailed_description, lat, lng, image) VALUES (${item.id}, '${escapeSql(item.title)}', '${escapeSql(item.description)}', '${escapeSql(item.detailed_description)}', ${item.lat}, ${item.lng}, '${escapeSql(item.image)}');`;
        fs.writeFileSync(tempSqlFile, query);
        run(`npx wrangler d1 execute ${dbName} --file=${tempSqlFile}`);
    }

    console.log('\n--- Seeding Reviews ---');
    for (const item of reviews) {
        const query = `INSERT INTO reviews (name, age, review, rating, image, date) VALUES ('${escapeSql(item.name)}', ${item.age}, '${escapeSql(item.review)}', ${item.rating}, '${escapeSql(item.image)}', ${item.date});`;
        fs.writeFileSync(tempSqlFile, query);
        run(`npx wrangler d1 execute ${dbName} --file=${tempSqlFile}`);
    }

    console.log('\nDatabase seeded successfully!');

} catch (error) {
    console.error("\n--- AN ERROR OCCURRED ---");
    console.error(error);
} finally {
    if (fs.existsSync(tempSqlFile)) {
        fs.unlinkSync(tempSqlFile);
        console.log("\nCleaned up temporary file.");
    }
}