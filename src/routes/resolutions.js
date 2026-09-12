import express from "express";
import authenticate from "../middleware/auth.js";
import addResolution from "../controllers/resolutions.js";

const router = express.Router();

router.post("/resolutions", authenticate, addResolution);

export default router;
