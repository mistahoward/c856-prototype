DROP TABLE IF EXISTS accommodations;
DROP TABLE IF EXISTS destinations;
DROP TABLE IF EXISTS reviews;

CREATE TABLE accommodations (
  id INTEGER PRIMARY KEY, title TEXT, description TEXT, lat REAL, lng REAL, image TEXT,
  expensive_price INTEGER, expensive_info TEXT, moderate_price INTEGER, moderate_info TEXT,
  cheapest_price INTEGER, cheapest_info TEXT
);
CREATE TABLE destinations (
  id INTEGER PRIMARY KEY, title TEXT, description TEXT, detailed_description TEXT,
  lat REAL, lng REAL, image TEXT
);
CREATE TABLE reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER, review TEXT,
  rating REAL, image TEXT, date INTEGER
);