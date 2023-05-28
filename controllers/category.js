const Category = require("../models/category")


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
    const category = new Category(req.body);
    await   category.save().then(function ( category) {
            return res.json(category);
            }).catch (function ( err)  {
            return res.status(400).json ({
            err: "Not able to save  category in db "
            });
            }) 
            };
exports.getCategory =  async (req, res) =>{
        return res.json(req.category);
        };
exports.getAllCategory = async (req, res) => {
await   category.find().then(function ( categories) {
        req.category = (categories)     
        next();
        }).catch ( function (err) {
        return res.status(400).json ({
        error: "No categories found"
        })
        })
    next();
     
}

exports.updateCategory = async (req, res) => {
      const category = req.category;
      category.name = req.body.name;
await category.save().then( function (updateCategory) {
      return req.json(updateCategory);
      }).catch(function (err){
      return res.status(400).json({
        error: "Failed to update Category"
      })  
      })   
};


exports.removeCategory = async ( req, res) => {
       const category = req.category;

await  category.remove().then(function (category) {
       return req.json(category)({
        massage: "Successfully deleted"
       })
       }).catch(function (err) {
       return res.status(400).json({
       error: "Failed to Delete This Category"
       })
})
}