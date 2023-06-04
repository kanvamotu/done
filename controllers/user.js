const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = async (req, res, next, id) => {
  await User.findById(id)
    .then(function (user) {
      req.profile = user;
      next();
    })
    .catch(function (err) {
      return res.status(400).json({
        err: `user not id not found`,
      });
    });
};

exports.getUser = (req, res) => {
  // TODO: get back here for password
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.UpdateUser = async (req, res) => {
  await User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, UseFindAndModify: false }
  )
    .then(function (user) {
      req.profile = user;
      next();
    })
    .catch(function (err) {
      return res.status(400).json({
        err: `you are not authorized to update this user`,
      });
    });
};

exports.userPurchaseList = async (req, res) => {
  await Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .then(function (order) {
      req.body.order = order;
      next();
    })
    .catch(function (err) {
      return res.status(400).json({
        error: "No Order in this Account",
      });
    });
};

exports.pushOrderInPurchaseList = async (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((items) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  await findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true }
  )
    .then(function (purchases) {
      req.body.order = purchases;
      next();
    })
    .catch(function (err) {
      return res.status(400).json({
        error: "Unable to save purchas list",
      });
    });

  next();
};
