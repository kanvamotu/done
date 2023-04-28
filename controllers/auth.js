const User = require("../models/user");


// exports.signout = (req, res) =>{
//     res.json({
//         message : "user signout"
//     });
// };

// exports.signin = (req, res) =>{
//      res.json({
//          message : "user signin"
//      });
//  };


//  exports.signup = (req, res) =>{
//  console.log("REQ BODY", req.body)
//      res.json({
//          message : "user signup"
//      })
//  };


exports.signup = (req, res) => {
    const user = new User(req.body)

    user.save((err, user) => {
   if(err){
    return res.status(400).json({
        err: "NOT able to save user in DB "
    })
   }
   res.json(user)
    })
};