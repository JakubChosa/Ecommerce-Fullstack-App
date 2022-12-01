import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      maxlength: 50,
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Please provide rating"],
      default: 5,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, "Please provide review text"],
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
      trim: true,
    },
    product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);
  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId.toString() },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post("remove", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

export default mongoose.model("Review", ReviewSchema);
