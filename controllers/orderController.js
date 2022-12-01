import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createOrder = async (req, res) => {
  const { items: cartItems, shippingFee } = req.body;
  if (!cartItems || !shippingFee || cartItems.length < 1) {
    throw new BadRequestError("please provide all values");
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new NotFoundError(`product with id : ${item.product} not found`);
    }
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name: name,
      price: price,
      color: item.color,
      image: image,
      product: _id,
    };
    orderItems = [...orderItems, singleOrderItem];
    subtotal += item.amount * item.price;
  }
  const total = subtotal + shippingFee;
  const order = await Order.create({
    orderItems,
    subtotal,
    total,
    createdBy: req.user.userId,
    shippingFee,
  });
  res.status(StatusCodes.CREATED).json({ msg: "Order successfully created" });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ orders });
};

const getSingleOrder = async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) {
    throw new BadRequestError("please provide proper order id");
  }

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`order with id: ${orderId} does not exist`);
  }
  res.status(StatusCodes.OK).json({ msg: "success", order });
};

const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  if (!orderId) {
    throw new BadRequestError("please provide proper order id");
  }
  if (!status || status !== "canceled") {
    throw new BadRequestError("please provide proper status");
  }

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`order with id: ${orderId} does not exist`);
  }
  checkPermissions(req.user, order.createdBy);
  order.status = status;
  await order.save();
  res.status(StatusCodes.OK).json({ msg: "Order successfully canceled" });
};

export { createOrder, getAllOrders, getSingleOrder, cancelOrder };
