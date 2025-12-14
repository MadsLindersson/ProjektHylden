import { Router } from 'express';
const router = Router();

import db from '../database/connection.js';

router.get("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const user = await db.get("SELECT * FROM users WHERE id = ?", id);

        const posts = await db.all(`
            SELECT 
                p.id, 
                p.title, 
                p.category_id, 
                c.name AS category_name, /* 💡 Get category name using JOIN */
                p.user_id, 
                (
                    SELECT image_url 
                    FROM post_images 
                    WHERE post_images.post_id = p.id 
                    ORDER BY order_index ASC 
                    LIMIT 1
                ) AS image_url
            FROM posts p
            /* 💡 JOIN categories table on the foreign key */
            JOIN categories c ON p.category_id = c.id
            WHERE p.user_id = ?
            ORDER BY p.id DESC; /* Changed to DESC, usually latest posts first */
        `, id);

        res.send({ user: user, posts: posts });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Database error" });
    }
});


export default router;