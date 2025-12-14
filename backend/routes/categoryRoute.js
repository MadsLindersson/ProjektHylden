import { Router } from 'express';
const router = Router();

import db from '../database/connection.js';

router.get("/categories", async (req, res) => {
    const categories = await db.all("SELECT * FROM categories");

    res.send({ categories: categories });
});

export default router;