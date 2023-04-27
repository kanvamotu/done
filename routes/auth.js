var express = require("express");
const { sign } = require("jsonwebtoken");
var router = express.Router();


// router.get("/signIn",(req, res) => {
//     res.send("user signIn");
// });
const { signin } = require("../controllers/auth");


const { signout } = require("../controllers/auth");


const { signup } = require("../controllers/auth");

// const signout = (req, res) =>{
//     res.json({
//         message : "user signout"
//     });
// }



// const signout = (req, res) =>{
//     res.send("user signout success");
// }



// router.get("/signout", signout);
// router.get("/signin", signin);
router.post("/signup", signup);
// router.get("/signup", signup);

//(req, res) => {
  //  res.send("user signout");
// });

module.exports = router;




