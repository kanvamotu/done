//const user = require("../models/user");
const User = require("../models/user");

exports.getUserById = async (req, res, next, id) => {
   await User.findById(id).then(function (user) {
        req.profile = user; 
        next();
    }).catch(function (err) {
        return res.status(400).json({
            err: `user not id not found`
        })
    });
}

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
        { new: true, UseFindAndModify: false },

    ).then(function (user) {
        req.profile = user; 
        next();
    }).catch(function (err) {
        return res.status(400).json({
            err: `you are not authorized to update this user`
         })
    })
    
};