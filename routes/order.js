const express = require("express");
const router = express.Router();

//const { getOrderById, createOrder } = require("../controllers/order");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

const { getOrderById, createOrder } = require("../controllers/order");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//Actual routes
//create
router.post("/order/create/:userId", isSignedIn, isAuthenticated, createOrder)

//read

module.exports = router;
