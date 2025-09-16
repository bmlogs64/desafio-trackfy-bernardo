import { Router } from "express";
import passport from "passport";
import { loginGoogle, googleCallback } from "../controllers/authController";

const router = Router();

router.get("/google", loginGoogle);
router.get("/google/callback", googleCallback);


export default router;
