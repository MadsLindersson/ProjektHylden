import { Router } from 'express';
const router = Router();

import db from '../database/connection.js';

router.get("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const user = await db.get("SELECT * FROM users WHERE id = ?", id);

        const posts = await db.all(`
            SELECT 
                posts.id, 
                posts.title, 
                posts.category, 
                posts.user_id, 
                (
                    SELECT image_url 
                    FROM post_images 
                    WHERE post_images.post_id = posts.id 
                    ORDER BY order_index ASC 
                    LIMIT 1
                ) AS image_url
            FROM posts
            WHERE posts.user_id = ?
            ORDER BY posts.id ASC;
        `, id);

        res.send({ user: user, posts: posts });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Database error" });
    }
});


export default router;