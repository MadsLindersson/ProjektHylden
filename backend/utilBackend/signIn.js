import db from "../database/connection.js";
import hashing from "../utilBackend/hashing.js";

export async function signIn(req, res, next) {
    const { email, password } = req.body;

    const user = await db.get("SELECT * FROM users WHERE email = ?", email);

    try {
        if (!user) {
            res.status(401).send({ data: "Sign in information is wrong, try again" });
        }

        if (await hashing.comparePasswords(password, user.password)) {
            req.session.userId = user.id;
            req.session.userRole = user.role;
            req.session.username = user.username;
            return next();
        } else {
            res.status(401).send({ data: "signIn information is incorrect, please try again" });
        }
    } catch (error) {
        console.log("signIn error:", error);
        return res.status(500).send({ data: "Internal server error" });
    }
}
