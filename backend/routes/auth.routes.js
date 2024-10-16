import express from "express";
import {
  checkuth,
  signInController,
  signout,
  signUpController,
} from "../controllers/auth.controller.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";

const router = express.Router();

router.post("/sign-up", signUpController);
router.post("/sign-in", signInController);
router.post("/sign-out", signout);
router.get("/check-auth", verifyAuth, checkuth);

export default router;
