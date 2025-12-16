import { Router } from "express";
const router = Router();

import db from '../database/connection.js';

router.post("/posts/:amount", async (req, res) => {
    try {
        const amount = parseInt(req.params.amount, 10);
        const exclude = req.body.exclude || [];

        let query = `
            SELECT 
            posts.id, 
            posts.title, 
            posts.category_id, 
            categories.name AS category_name,
            posts.user_id, 
            users.username,
            users.profile_pic_url,
                (
                    SELECT image_url 
                    FROM post_images 
                    WHERE post_images.post_id = posts.id 
                    ORDER BY order_index ASC 
                    LIMIT 1
                ) AS image_url
            FROM posts
            JOIN users ON posts.user_id = users.id
            JOIN categories ON posts.category_id = categories.id 
        `;
        
        let params = [];

        if (exclude.length > 0) {
            const placeholders = exclude.map(() => "?").join(",");
            query += `WHERE id NOT IN (${placeholders}) `;
            params = exclude;
        }

        query += "ORDER BY RANDOM() LIMIT ?";
        params.push(amount);

        const rows = await db.all(query, params);
        res.send({ posts: rows});
    } catch (err) {
        console.error(err);
        res.status(500).send( { error: "Database error" } );
    }
});

router.get("/posts/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        const posts = await db.all(`
            SELECT 
                p.id, 
                p.title, 
                p.category_id, 
                c.name AS category_name,
                p.user_id, 
                (
                    SELECT image_url 
                    FROM post_images 
                    WHERE post_images.post_id = p.id 
                    ORDER BY order_index ASC 
                    LIMIT 1
                ) AS image_url
            FROM posts p
            JOIN categories c ON p.category_id = c.id
            WHERE p.user_id = ?
            ORDER BY p.id DESC;
        `, userId);

        res.send({ posts: posts });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Database error" });
    }
});

export default router;