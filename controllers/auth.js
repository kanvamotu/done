const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const Jwt = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);

  user
    .save()
    .then(function (user) {
      return res.json({
        message: 'Signup successful'
      });
    })
    .catch(function (err) {
      return res.status(400).json({
        err: `user Already exists for ${req.body.email} `,
      });
    });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email })
    .then(function (user) {
      if (!user.autheticate(password)) {
        return res.status(401).json({
          error: `email and password do not match`,
        });
      }
      //create token
      const token = Jwt.sign({ _id: user._id }, process.env.SECRET);

      //PUT token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });
      //send responce to front end
      const { _id, name, role } = user;
      return res.json({ token, user: { _id, name, email, role } });
    })
    .catch(function (err) {
      return res.status(400).json({
        err: `user Already exists for ${req.body.email} `,
      });
    });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout successfully",
  });
};

exports.isSignedIn = jwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "you are not ADMIN, access denied",
    });
  }
  next();
};
