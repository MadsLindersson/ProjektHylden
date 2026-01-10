import Router from "express";
const router = Router();

import hashing from "../utilBackend/hashing.js";
import db from "../database/connection.js";
import { signIn } from "../utilBackend/signIn.js";
import { sendEmail } from "../utilBackend/resend.js";

router.get("/status", (req, res) => {
    if (req.session.userId) {
        return res.status(200).send({
            isAuthenticated: true,
            userId: req.session.userId,
            userRole: req.session.userRole,
        });
    }

    return res.status(200).send({
        isAuthenticated: false,
    });
});

router.post("/auth/signIn", signIn, (req, res) => {
    res.send({ userId: req.session.userId, userRole: req.session.userRole });
});

router.post("/signUp", async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await hashing.hashPassword(password);

    try {
        await db.run(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            username,
            email,
            hashedPassword
        );

        await sendEmail(
            email,
            "Welcome to authManII!",
            `<h1>Welcome!</h1><p>Your account has been created.</p>`
        );
    } catch (error) {
        return res.status(500).send({ data: "Something went wrong", error });
    }

    return res.status(200).send({ data: "Account has been created" });
});

router.delete("/signOut", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send({ data: "Sign out failed" });
        } else {
            res.clearCookie("connect.sid");
            res.send({ data: "Signed out successfully" });
        }
    });
});

export default router;
