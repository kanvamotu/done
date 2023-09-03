const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { selectFields } = require("express-validator/src/select-fields");
const category = require("../models/category");

exports.getProductById = async (req, res, next, id) => {
  await Product.findById(id)
    .populate("category")
    .then(function (product) {
      req.Product = product;

      next();
    })
    .catch(function (err) {
      return res.status(400).json({
        err: "product ID not found",
      });
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    //destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        err: "Please include all fields",
      });
    }

    //restriction on field
    const product = new Product(fields);
    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size is to big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.filepath);
      product.photo.contentType = file.photo.mimetype;
    }

    //save to the DB
    await product.save()
      .then(function (product) {
        delete product._doc.photo;
        return res.json(product);
      })
      .catch(function (err) {
        return res.status(400).json({
          err: "saving tshirt in DB failed",
        });
      });
  });
};

exports.getProduct = async (req, res) => {
  req.Product.photo = undefined;
  return res.json(req.Product);
};

exports.photo = async (req, res) => {
  if (req.Product.photo.data) {
    res.set("Content-Type", req.Product.photo.contentType);
    return res.send(req.Product.photo.data);
  }
};

exports.removeProduct = async (req, res) => {
  try {
    let product = req.Product;
    await product
      .deleteOne()
      .then(function (product) {
        return res.json(product)({
          massage: "Product Succesfully Deleted ",
        });
      })
      .catch(function (err) {
        return res.status(400).json({
          error: "Failed to Delete This Product",
        });
      });
  } catch (error) {
    return res.status(400).json({
      error: "Product already deleted",
    });
  }
};

exports.updateProduct = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //restriction on field
    let product = req.Product;
    product = _.extend(product, fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size is to big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.filepath);
      product.photo.contentType = file.photo.mimetype;
    }

    //save to the DB
    product.save()
      .then(function (product) {
        delete product._doc.photo;
        return res.json(product);
      })
      .catch(function (err) {
        return res.status(400).json({
          err: "Update of Product failed",
        });
      });
  });
};

exports.getAllProducts = async (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 9;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  await Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .then(function (products) {
      return res.status(400).json({
        products: products
      });
    })
    .catch(function (err) {
      return res.status(400).json({
        err: " No Product Found ",
      });
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {})
    .then(function (category) {
      return res.json(category);
    })
    .catch(function (err) {
      return res.status(400).json({
        err: "No Category found",
      });
    });
};

exports.UpdateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(
    myOperations,
    {}
      .then(function (products) {
        return res.json(products);

      })
      .catch(function (err) {
        return res.status(400).json({
          err: " Bulk operation failed",
        });
      })
  );
};
