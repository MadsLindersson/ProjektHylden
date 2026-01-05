import 'dotenv/config';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import hashing from './utilBackend/hashing.js'; // Adjust path to your hashing utility

async function seed() {
    const db = await open({
        filename: './projekt_hylden.db', // Adjust to your DB name
        driver: sqlite3.Database
    });

    console.log("Seeding database...");

    // 1. Clear existing data (Optional, but keeps things clean)
    await db.run("DELETE FROM likes");
    await db.run("DELETE FROM post_images");
    await db.run("DELETE FROM posts");
    await db.run("DELETE FROM users");

    // 2. Create Dummy Users
    const password = await hashing.hashPassword("pass123");
    
    // I can generate a massive list of these for you:
    const users = [
        { username: "ArtLover", email: "art@test.com", pic: "/uploads/user1.jpg" },
        { username: "TechGuru", email: "tech@test.com", pic: "/uploads/user2.jpg" }
    ];

    for (const u of users) {
        await db.run(
            "INSERT INTO users (username, email, password, profile_pic_url) VALUES (?, ?, ?, ?)",
            [u.username, u.email, password, u.pic]
        );
    }

    // 3. Create Dummy Posts
    // I can generate a massive list of these for you:
    const posts = [
        { 
            title: "Mountain Sunset", 
            description: "A beautiful view of the Alps.", 
            userId: 1, 
            categoryId: 1, 
            images: ["/uploads/dummy1.jpg", "/uploads/dummy2.jpg"] 
        }
    ];

    for (const p of posts) {
        const result = await db.run(
            "INSERT INTO posts (title, description, user_id, category_id) VALUES (?, ?, ?, ?)",
            [p.title, p.description, p.userId, p.categoryId]
        );
        const postId = result.lastID;

        // Add images for this post
        for (let i = 0; i < p.images.length; i++) {
            await db.run(
                "INSERT INTO post_images (post_id, image_url, order_index) VALUES (?, ?, ?)",
                [postId, p.images[i], i]
            );
        }
    }

    console.log("Seeding complete! 🚀");
    process.exit();
}

seed();