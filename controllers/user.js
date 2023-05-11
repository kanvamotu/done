const  User = ("../models/user");

exports.getUserById = (req, res,next, id)=>{
    User.findById  ({id}) .then(function (user){
        return res.json(user)
}).catch(function (err) {
    return res.status(400).json({
        err: `user not id not found`
    })
})
}

exports.getUser = (req, res)=>{
    // TODO: get back here for password
    req.profile.salt =undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
};


exports.UpdateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, UseFindAndModify: false},
      
).then( function (_id) {
    if(err)
    return res

})
}