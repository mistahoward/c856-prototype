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

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firebase_id TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT,
    photo_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL, -- 'accommodation' or 'destination'
    item_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(user_id, type, item_id)
);

CREATE INDEX IF NOT EXISTS idx_users_firebase_id ON users(firebase_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_type_item ON favorites(type, item_id);