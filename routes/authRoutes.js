import express from "express";
const router = express.Router();
import { register, login, logout } from "../controllers/authController.js";
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 100,
  max: 10,
  message: "Too many request from this IP address, please wait 15minutes",
});

router.post("/register", apiLimiter, register);
router.post("/login", apiLimiter, login);
router.get("/logout", logout);

export default router;
