var express = require("express");

var router = express.Router();
const { check, validationResult } = require("express-validator");

const { sign } = require("jsonwebtoken");

const { signin, signup, isSignedIn, signout} = require("../controllers/auth");






router.post("/signup",[
  check("name","name should be at least 5 char").isLength({ min: 5 }),
  check("email","email should be at least 5 char").isEmail(),
  check("password","password should be at least 8 char").isLength({ min: 8 }),
],
signup);


//(req, res) => {
 //  res.send("user signout");
// });


router.post("/signin",
[
 check("email","email should be at least 5 char").isEmail(),
 check("password","password field is required").isLength({ min: 8 }),
],
signin);


router.get("/signout", signout);

 router.get("/testroute", isSignedIn, (req, res)=>{
res.json("req.auth");
 })


//router.get("/signout", signout);


module.exports = router;




