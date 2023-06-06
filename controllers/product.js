const Product = require("../models/product")


exports.getProductById = async(req, res, next, id) => {
 await  Product.findById(id)
 .populate("category")
 .then(function (product) {
    req.Product = product;

    next();
 })
 .catch( function ( err ) {
   return res.status(400).json ({
    err : "product ID not found" 
   });

 });

};