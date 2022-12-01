import Review from "../models/Review.js";
import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createReview = async (req, res) => {
  const { product } = req.body;
  const doesProductExist = await Product.findOne({ _id: product });
  if (!doesProductExist) {
    throw new NotFoundError(`product with id: ${productId} does not exist`);
  }
  const alreadySubmitted = await Review.findOne({
    product,
    user: req.user.userId,
  });
  if (alreadySubmitted) {
    throw new BadRequestError(`Already submitted review for this product`);
  }
  req.body.createdBy = req.user.userId;
  req.body.userName = req.user.name;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "review created!" });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate({
      path: "product",
      select: "name price image",
    })
    .populate({
      path: "createdBy",
      select: "name",
    });
  res.status(StatusCodes.OK).json({ msg: "works", reviews });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`review with id: ${reviewId} does not exist`);
  }
  res.status(StatusCodes.OK).json({ review });
};

const UpdateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { title, rating, comment } = req.body;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`review with id: ${reviewId} does not exist`);
  }
  checkPermissions(req.user.userId, review.createdBy);
  review.title = title;
  review.comment = comment;
  review.rating = rating;
  await review.save();
  res.status(StatusCodes.OK).json({ msg: "review updated!" });
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`review with id: ${reviewId} does not exist`);
  }
  checkPermissions(req.user, review.createdBy);
  await review.remove();
  res.status(StatusCodes.OK).json({ msg: "review deleted" });
};

export {
  createReview,
  getAllReviews,
  getSingleReview,
  UpdateReview,
  deleteReview,
};
