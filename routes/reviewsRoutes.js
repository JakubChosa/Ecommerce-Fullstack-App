import express from "express";
const router = express.Router();
import {
  createReview,
  getAllReviews,
  getSingleReview,
  UpdateReview,
  deleteReview,
} from "../controllers/reviewController.js";

import authenticateUser from "../middleware/auth.js";

router.route("/").get(getAllReviews).post(authenticateUser, createReview);

router
  .route("/:id")
  .get(getSingleReview)
  .patch(authenticateUser, UpdateReview)
  .delete(authenticateUser, deleteReview);

export default router;
