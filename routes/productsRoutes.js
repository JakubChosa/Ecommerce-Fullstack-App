import express from "express";
const router = express.Router();
import {
  getAllProducts,
  getSingleProducts,
} from "../controllers/productController.js";

router.get("/", getAllProducts);
router.get("/:productId", getSingleProducts);

export default router;
