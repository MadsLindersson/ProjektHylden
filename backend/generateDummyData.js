import "dotenv/config";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import hashing from "./utilBackend/hashing.js";

async function seed() {
    const db = await open({
        filename: "./projekt_hylden",
        driver: sqlite3.Database,
    });

    await db.run("DELETE FROM likes");
    await db.run("DELETE FROM post_images");
    await db.run("DELETE FROM posts");
    await db.run("DELETE FROM users");
    await db.run("DELETE FROM categories");
    await db.run("DELETE FROM sqlite_sequence");

    const categoryNames = [
        'Photography', 'Illustration', 'Digital Art', 'Graphic Design', 
        'UI/UX', 'Typography', '3D Art', 'Animation', 'Fine Art', 'Crafts & DIY'
    ];
    
    for (const name of categoryNames) {
        await db.run("INSERT INTO categories (name) VALUES (?)", [name]);
    }

    const commonPassword = await hashing.hashPassword("pass123");
    const adminPassword = await hashing.hashPassword("Hej");

    const usernames = [
        "Admin", "PixelPirate", "VividCanvas", "DesignDrifter", "Articulated",
        "SkylineSketcher", "NeonNoir", "InkInspired", "VectorVibe", "MotionMaster",
        "CreativeCactus", "StudioSpirit", "GraphixGuru", "MinimalMads", "BoldBrush",
        "DigitalDreamer", "LayerLogic", "AbstractAura", "PurePixel", "FrameFocus",
    ];

    for (let i = 1; i <= usernames.length; i++) {
        const isAdmin = usernames[i - 1] === "Admin";
        await db.run(
            `INSERT INTO users (username, email, password, profile_pic_url, bio, role) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                usernames[i - 1],
                `${usernames[i - 1].toLowerCase()}@example.com`,
                isAdmin ? adminPassword : commonPassword,
                `/uploads/profilePictures/profilePic${i}.jpg`,
                isAdmin ? "System Administrator." : `Professional creator specialized in Arts.`,
                isAdmin ? "admin" : "creator",
            ]
        );
    }

    const titles = [
        "Golden Hour", "Cyberpunk Alley", "Minimalist Study", "The Lost City",
        "Geometric Bliss", "Over the Horizon", "Neon Dreams", "Static Silence",
        "Fluid Motion", "Industrial Rust", "Midnight Blue", "Organic Patterns",
        "Vector Landscape", "Concrete Jungle", "Soft Shadows",
    ];

    for (let i = 1; i <= 60; i++) {
        const userId = Math.floor(Math.random() * 20) + 1;
        const categoryId = Math.floor(Math.random() * 10) + 1;
        const title = titles[i % titles.length];
        const date = new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString();

        const result = await db.run(
            `INSERT INTO posts (user_id, title, description, category_id, created_at) 
             VALUES (?, ?, ?, ?, ?)`,
            [userId, title, `Exploring new techniques. What do you think?`, categoryId, date]
        );

        const postId = result.lastID;
        const imgCount = Math.floor(Math.random() * 5) + 1;

        for (let j = 0; j < imgCount; j++) {
            const randomDummyIndex = Math.floor(Math.random() * 60) + 1;
            await db.run(
                `INSERT INTO post_images (post_id, image_url, order_index) 
                 VALUES (?, ?, ?)`,
                [postId, `/uploads/postImages/dummy${randomDummyIndex}.jpg`, j]
            );
        }
    }

    for (let pId = 1; pId <= 60; pId++) {
        const likeCount = Math.floor(Math.random() * 15);
        const likers = new Set();
        while (likers.size < likeCount) {
            likers.add(Math.floor(Math.random() * 20) + 1);
        }

        for (const uId of likers) {
            await db.run("INSERT OR IGNORE INTO likes (post_id, user_id) VALUES (?, ?)", [pId, uId]);
        }
    }

    console.log("Generate data finished");
    process.exit(0);
}

seed().catch((err) => {
    process.exit(1);
});