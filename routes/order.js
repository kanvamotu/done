const express = require("express");
const router = express.Router();

//const { getOrderById, createOrder } = require("../controllers/order");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { UpdateStock } = require("../controllers/product");

const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderStatus,
} = require("../controllers/order");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//Actual routes
//create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  createOrder
);

//read

router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  getAllOrders
);

// status of order

router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  getOrderStatus
);

router.post(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  updateStatus
);

module.exports = router;
