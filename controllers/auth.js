const User = require("../models/user");
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
          error:errors.array()[0].msg
        })
      }
      

    const user = new User(req.body)

    user.save().then(function (user) {
        return res.json(user);
    }).catch(function (err) {
        return res.status(400).json({
            err: `User Already exists for ${req.body.email}`
        });
    })
};



exports.signin = (req, res) => {
    const errors = validationResult(req);
    const {email, password} =req.body;
    
    if(!errors.isEmpty()){
      return res.status(422).json({
        error:errors.array()[0].msg
      })
    }
    
          const user = new User(req.body);
    
          User.findOne({email},(user)).then((user)=>{
            return res.json(user);
           }).catch((err)=> {
            return res.status(400).json({
                err: 'user Already exists for ${req.body.email} '
            });
           })
           if(!user.autheticate(password)){
            return res.status(401).json({
              error: "email and password do not match"
            });
            
           }n
          const token = jwt.sign({_id: user._id},process.env.SECRET)
          //PUT token in cookie
          res.cookie("token", token, {expire: new Date() + 9999});
          //send responce to front end
        const {_id, name, role} = user;
        return res.json({token,user:{_id, name, email, role}});
                      
          };
    