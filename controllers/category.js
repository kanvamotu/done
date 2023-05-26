const category = require("../models/category")


exports.getCategoryById =  async(req, res, next, id) =>{

    await category.findById(id).then(function (category) {
    req.category = (category)        

    next();
  
    }).catch( function (err) {
    return res.status(400).json({
        err: `user not id not found`
    })
    });
    next();
    };


   exports.createCategory = async (req, res) => {
    const category = new category(req.body);
    await   category.save().then(function ( category) {
    return res.json(category);
    }).catch (function ( err)  {
        return res.status(400).json ({
            err: "Not able to save  category in db "
        });
    }) 

}
exports.getCategory =  async (req, res) =>{
    return res.json(req.category);
};
exports.getAllCategory = async (req, res) => {
    await category.find().then(function ( categories) {
        req.category = (categories)     
         next();
    }).catch ( function (err) {
        return res.status(400).json ({
            error: "No categories found"
        })
    })
    next();
     
}
