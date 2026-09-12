import { signup, signin, signout } from "../controllers/auth.js";
import express from "express";
import authenticate from "../middleware/auth.js";


const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/signout", authenticate, signout)

export default router
