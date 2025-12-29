import { Router } from "express";
const router = Router();

import db from '../database/connection.js';
import { uploadPostPicture } from "../utilBackend/multerConfig.js";

router.get("/posts/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const posts = await db.all(`
            SELECT 
                posts.id, 
                posts.title, 
                posts.category_id, 
                posts.description,
                posts.created_at,
                categories.name AS category_name,
                posts.user_id, 
                users.username,
                users.profile_pic_url,
                (
                    SELECT image_url 
                    FROM post_images 
                    WHERE post_images.post_id = posts.id 
                    ORDER BY order_index ASC 
                ) AS image_urls
            FROM posts
            JOIN categories ON posts.category_id = categories.id
            JOIN users ON posts.user_id = users.id
            WHERE posts.user_id = ?
            ORDER BY posts.id DESC;
        `, userId);

        res.send({ posts: posts });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
});

router.get("/imageUrls/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;

        const imageUrls = await db.all(`SELECT * FROM post_images WHERE post_id = ?`, postId);

        res.send({ imageUrls: imageUrls });
    } catch (error)  {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
})

// Is a GET but has to be post so the frontend can send a list of id's to exclude, to avoid dublicates.
router.post("/posts/gallery/:amount", async (req, res) => {
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
            posts.created_at,
            users.username,
            users.profile_pic_url,
                (
                    SELECT image_url 
                    FROM post_images 
                    WHERE post_images.post_id = posts.id 
                    ORDER BY order_index ASC 
                ) AS image_urls
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

router.post("/posts/:userId", uploadPostPicture.array('postImages'), async (req, res) => {
    try {
        const userId = req.params.userId;
        const {title, description, category} = req.body;

        const postResult = await db.run(`INSERT INTO posts (title, description, category_id, user_id, created_at)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`, [title, description, category, userId]);

        let postId = postResult.lastID 
    
        if (req.files && req.files.length > 0)   {
            for (let i = 0; i < req.files.length; i++) {
                const imageUrl = `/uploads/postImages/${req.files[i].filename}`;
                
                await db.run(
                    `INSERT INTO post_images (post_id, image_url, order_index) 
                     VALUES (?, ?, ?)`,
                    [postId, imageUrl, i]
                );
            }
        };

        res.status(201).send({ data: "Post created" })


    } catch (err)   {
        console.error(err);
        res.status(500).send({ error: "Database error" });
    }
});

router.delete("/posts/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;

        const postResult = await db.run("DELETE FROM posts WHERE id = ?", postId);
        const postImgResult = await db.run("DELETE FROM post_images WHERE post_id = ?", postId);

        if (postResult.changes !== 0 && postImgResult.changes !== 0)   {
            res.status(200).send({ data: "Post deleted" });
        } else {
            res.status(500).send({ data: "Something went wrong" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
});


export default router;