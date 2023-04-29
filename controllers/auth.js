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

    user.save().then(function (user) {
        return res.json(user);
    }).catch(function (err) {
        return res.status(400).json({
            err: `User Already exists for ${req.body.email}`
        });
    })
};