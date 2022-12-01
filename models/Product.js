import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
      default: 0,
    },
    description: {
      type: String,
      minlength: 10,
      maxlength: 1000,
      required: [true, "Please provide description"],
    },
    image: {
      type: String,
      required: [true, "Please provide image"],
      default: "/uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: ["office", "kitchen", "bedroom", "living room", "kids", "dining"],
    },
    company: {
      type: String,
      required: [true, "Please provide company"],
      enum: {
        values: ["ikea", "liddy", "marcos", "caressa"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      required: true,
      default: ["#222"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      default: 15,
    },
    averageRating: {
      type: Number,
      required: [true, "Please provide price"],
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

ProductSchema.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
});

export default mongoose.model("Product", ProductSchema);
