import db from './connection.js';

db.exec(`
    CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE, 
    password TEXT NOT NULL,
    profile_pic TEXT,
    bio TEXT,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT,
    -- Rettet: Refererer nu til 'users'
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE post_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    postId INTEGER NOT NULL,
    imageUrl TEXT NOT NULL,
    orderIndex INTEGER DEFAULT 0,
    -- Rettet: Refererer nu til 'posts'
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    text TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    -- Rettet: Refererer nu til 'posts'
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
    -- Rettet: Refererer nu til 'users'
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE likes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    createdAt TEXT NOT NULL,
    -- Rettet: Refererer nu til 'posts'
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
    -- Rettet: Refererer nu til 'users'
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
    
`);