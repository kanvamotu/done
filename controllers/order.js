const { Order, ProductCart } = require("../models/order");

exports.getOrderById = async (req, res, next, id) => {
  await Order.findById(id)
    .popolate("products.product", "name price")
    .then(function (order) {
      req.Order = order;

      next();
    })
    .catch(function (err) {
      return res.status(400).json({
        err: " Order id not found",
      });
    });
};

exports.createOrder = async (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  await order
    .save()
    .then(function (order) {
      return res.json(order);
    })
    .catch(function (err) {
      return res.status(400).json({
        err: "Unable to save your Order in DB ",
      });
    });
};

exports.getAllOrders = async (req, res) => {
  await Order.find()
    .populate("user", "id name")
    .then(function (order) {
      req.Order = order;
    })
    .catch(function (err) {
      return res.status(400).json({
        err: "No order found in DB",
      });
    });
};

exports.updateStatus = async (req, res) => {
  await Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } }
  )
    .then(function (order) {
      return res.json(order);
    })
    .catch(function (err) {
      return res.status(400).json({
        err: "Cannot update order status",
      });
    });
};

exports.getOrderStatus = async (req, res) => {
  res.json(Order.schema.path(" status ").enumValues);
};
