const express = require("express")
const router = express.Router()

const { getUserById, getUser, UpdateUser, userPurchaseList } = require("../controllers/user")
const {isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")

router.param("userId", getUserById, UpdateUser);


router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId",isSignedIn, isAuthenticated, UpdateUser);

//router.get("/order/user/:userId",isSignedIn, isAuthenticated, userPurchaseList);
module.exports = router;