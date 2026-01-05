import { Router } from "express";
const router = Router();

import db from '../database/connection.js';
import { uploadPostPicture } from "../utilBackend/multerConfig.js";
import { adminCheck } from "../utilBackend/adminCheck.js";
import { sessionCheck } from "../utilBackend/sessionCheck.js";
import { onlineUsers, io } from "../app.js";

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
                ) AS image_urls,
                (
                    SELECT COUNT(*) 
                    FROM likes 
                    WHERE likes.post_id = posts.id
                ) AS likes_count,
                (SELECT COUNT(*) FROM likes WHERE post_id = posts.id AND user_id = ?
                ) AS user_has_liked
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
        const viewerId = req.session.userId || 0;

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
                    SELECT 
                    image_url
                    FROM post_images 
                    WHERE post_images.post_id = posts.id 
                    ORDER BY order_index ASC 
                ) AS image_urls,
                (
                    SELECT COUNT(*) 
                    FROM likes 
                    WHERE likes.post_id = posts.id
                ) AS likes_count,
                (SELECT COUNT(*) FROM likes WHERE post_id = posts.id AND user_id = ?
                ) AS user_has_liked
            FROM posts
            JOIN users ON posts.user_id = users.id
            JOIN categories ON posts.category_id = categories.id 
        `;
        
        let params = [viewerId];

        if (exclude.length > 0) {
            const placeholders = exclude.map(() => "?").join(",");
            query += `WHERE id NOT IN (${placeholders}) `;
            params = [...params, ...exclude];
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

router.post("/posts/like", sessionCheck, async (req, res) => {
    try {
        const { postId, userId } = req.body;

        try {
            await db.run("INSERT INTO likes (post_id, user_id) VALUES (?, ?)", postId, userId);
        } catch (error) {
            if (error.message.includes("UNIQUE")) {
                return res.status(400).send({ data: "Already liked" });
            }
            res.status(500).send({ error: "Database error" });
        }

        const newCount = await db.get("SELECT count(*) as count FROM likes WHERE post_id = ?", postId);

        const recipient = await db.get("SELECT user_id FROM posts WHERE id = ?", postId);

        if (recipient)  {
            const recipientId = recipient.user_id;
            const recipientSocketId = onlineUsers.get(recipientId);

            io.to(recipientSocketId).emit("new-like-notification", {
                message: `${req.session.username} liked your post!`,
                postId: postId
                });
        }

        res.status(200).send({ data: "Post liked", newCount: newCount.count });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
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

router.delete("/posts/:postId", adminCheck, async (req, res) => {
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

router.delete("/images/:imageId", adminCheck, async (req, res) => {
    try {
        const imageId = req.params.imageId;

        const result = await db.run("DELETE FROM post_images WHERE id = ?", imageId);

        if (result.changes !== 0)   {
            res.status(200).send({ data: "Image deleted" });
        } else {
            res.status(500).send({ data: "Something went wrong" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
});

router.delete("/likes/:postId/:userId", sessionCheck, async (req, res) => {
     try {
        const postId = req.params.postId;
        const userId = req.params.userId;

        const result = await db.run("DELETE FROM likes WHERE post_id = ? AND user_id = ?", postId, userId);

        if (result.changes === 0) {
                return res.status(500).send({ data: "Like not found" });
        }

        const newCount = await db.get("SELECT COUNT(*) as count FROM likes WHERE post_id = ?", postId);

        res.status(200).send({ data: "Post unliked", newCount: newCount.count });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
});

export default router;