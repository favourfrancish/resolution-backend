import express from "express";
import authenticate from "../middleware/auth.js";
import { addThought, pinThought } from "../controllers/thoughts.js";

const router = express.Router();

router.post("/thoughts", authenticate, addThought);
router.patch( "/thought/:thoughtId/pin", authenticate, pinThought );


export default router;
