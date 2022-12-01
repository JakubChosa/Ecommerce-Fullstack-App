import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";

const getAllProducts = async (req, res) => {
  const { company, category, colors, freeShipping, search, price } = req.query;
  const queryObj = {};
  if (company && company !== "all") {
    queryObj.company = company;
  }
  if (category && category !== "all") {
    queryObj.category = category;
  }
  if (colors && colors !== "all") {
    queryObj.colors = colors;
  }
  if (freeShipping) {
    queryObj.freeShipping = true;
  }
  if (price && price > 0) {
    queryObj.price = { $lte: Number(price) };
  }
  if (search) {
    queryObj.name = { $regex: search, $options: "i" };
  }

  const products = await Product.find({ ...queryObj });
  res.status(StatusCodes.OK).json({ products, totalProducts: products.length });
};
const getSingleProducts = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOne({ _id: productId }).populate("reviews");
  if (!product) {
    throw new NotFoundError(`product with id: ${productId} was not found`);
  }
  res.status(StatusCodes.OK).json({ product });
};

export { getAllProducts, getSingleProducts };
