import express from "express";
const router = express.Router();
import {
  createOrder,
  getAllOrders,
  getSingleOrder,
  cancelOrder,
} from "../controllers/orderController.js";

router.route("/").get(getAllOrders).post(createOrder);
router.route("/:orderId").get(getSingleOrder).patch(cancelOrder);

export default router;
