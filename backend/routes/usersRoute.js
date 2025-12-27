import { Router } from 'express';
const router = Router();

import db from '../database/connection.js';
import { uploadProfilePicture } from '../utilBackend/multerConfig.js';
import { adminCheck } from '../utilBackend/adminCheck.js';

router.get("/users", async (req, res) => {
    try {
        const users = await db.all(`
            SELECT 
            users.id, 
            users.username, 
            users.bio,
            users.profile_pic_url,
            users.created_at,
            users.role,
            COUNT(posts.id) AS post_count
            FROM users
            LEFT JOIN posts ON users.id = posts.user_id
            GROUP BY users.id
            ORDER BY post_count DESC`);

        res.send({ users: users });
    } catch (error) {
        console.error(err);
        res.status(500).send({ error: "Database error" });
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await db.get("SELECT * FROM users WHERE id = ?", id);

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        res.send({ user: user });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Database error" });
    }
});

router.patch("/users/:id", uploadProfilePicture.single('profilePic'), async (req, res) => {
    try {
        const bio = req.body.bio;
        const id = req.params.id;

        let profilePicUrl = null;

        if (req.file)   {
            profilePicUrl = `/uploads/profilePictures/${req.file.filename}`;
        }

        const result = await db.run(`UPDATE users SET bio = COALESCE(?, bio), profile_pic_url = COALESCE(?, profile_pic_url) 
             WHERE id = ?`, [bio, profilePicUrl, id]);

        if (result.changes !== 0)   {
            res.status(200).send({ data: "User updated" });
        } else {
            res.status(500).send({ data: "Something went wrong" });
        }
    } catch (error)   {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
});

router.patch("/users/:id/role", adminCheck, async (req, res) => {
    try {
        const userId = req.params.id;
        const userRole = req.body.userRole;

        const result = await db.run(`UPDATE users SET role = ? WHERE id = ?`, userRole, userId);

        if (result.changes !== 0)   {
            res.status(200).send({ data: "User updated" });
        } else  {
            res.status(500).send({ data: "Something went wrong" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Database error" });
    }
});


export default router;