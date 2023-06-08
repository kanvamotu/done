const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs");
const { selectFields } = require("express-validator/src/select-fields");

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


exports.createProduct =  (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse( req, (err, fields, file) => {
    if(err){
      return res.status(400).json ({
        error:"problem with image"
      })
    }
    //destructure the fields
const {name, description, price, category, stock } = fields

if(
  !name ||
  !description ||
  !price ||
  !category ||
  !stock
) {
  return res.status(400).json({
    err : "Please include all fields"
  })
}

//restriction on field
const product =  new Product(fields)
//handle file here
if(file.photo){
  if(file.photo.size > 3000000){
    return res.status(400).json({
      error: "file size is to big!"
    })
  }
  product.photo.date = fs.readFileSync(file.photo.size)
  product.photo.contentType = file.photo.type
 

}
  
//save to the DB
    product
   .save
   .then(function ( product )  {
     return res.json(product);
   })
   .catch(function ( err) {
    return res.status(400).json({
      err : "saving tshirt in DB failed" 
    })
   })

  })
}