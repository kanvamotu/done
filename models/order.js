const mongoose = require("mongoose");
const{ObjectId} =mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    product:{
       type: ObjectId,
       ref:"Product"
    },
   name: String,
   count: Number,
   price: Number,
});
const ProductCart = mongoose.model("ProductCart", ProductCartSchema) 
const OrderSchema = new mongoose.Schema({

    products: [ProductcartSchema],
    transaction_id:{},
    amount:{type: Number},
    address: String,
    updated: Date,
    user:{
        type: ObjectId,
        ref: "user"
    }


   
},
{timestamps: true})

const Order = mongoose.model("Order", OrderSchema) 

module.export = {Order, ProductCart};