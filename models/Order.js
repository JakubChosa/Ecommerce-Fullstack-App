import mongoose from "mongoose";

const SingleOrderItem = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
});

const OrderSchema = new mongoose.Schema(
  {
    shippingFee: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: [SingleOrderItem],
    status: {
      type: String,
      enum: ["pending", "failed", "canceled", "delivered"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
