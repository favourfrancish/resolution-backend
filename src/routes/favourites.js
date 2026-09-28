import express from "express";
import authenticate from "../middleware/auth.js";
import addToFavourites from "../controllers/favourites.js";

const router = express.Router();

router.post("/addtofavourites", authenticate, addToFavourites);

export default router;
