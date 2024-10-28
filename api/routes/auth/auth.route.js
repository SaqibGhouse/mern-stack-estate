import express from "express";
import { signUp, signIn, signOut } from "../../controllers/auth/auth.controller.js";

const router = express.Router();

router.post('/signUp', signUp)

router.post('/signIn', signIn)

router.get('/signout', signOut)

export default router;