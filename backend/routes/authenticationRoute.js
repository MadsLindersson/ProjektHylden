import Router from 'express';
const router = Router();

import hashing from '../utilBackend/hashing.js';

import db from '../database/connection.js';

import { signIn } from '../utilBackend/signIn.js';

// Endpoints =====================================================================================

router.get("/status", (req, res) => {
    if (req.session.userId) {
        return res.status(200).json({ 
            isAuthenticated: true,
            userId: req.session.userId
        });
    }

    return res.status(200).json({ 
        isAuthenticated: false
    });
});

router.post("/auth/signIn", signIn, (req, res) => {    
    res.send({ userId: req.session.userId });
});

router.post("/signUp", async (req, res) => {
    const {username, email, password} = req.body;
    const hashedPassword = await hashing.hashPassword(password);
    
    try {
        await db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
    } catch (error)  {
        return res.status(500).send({ data: "Something went wrong", error })
    }

    return res.status(201).send({ data: "Account has been created" });
});

router.delete("/signOut", (req, res) => {
    req.session.destroy(error => {
        if (error)  {
            res.status(500).send({ data: "Sign out failed" })
        } else {
            res.send({ data: "Signed out succesfully" });
        }
    });
});

export default router;