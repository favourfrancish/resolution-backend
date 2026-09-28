import express from "express";
import getBibleBooks from "../controllers/bible.js";

const router = express.Router();


router.get("/bible/:version", getBibleBooks);

export default router;