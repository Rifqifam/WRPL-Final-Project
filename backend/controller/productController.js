const Product = require("../models/product");
const APIFeatures = require("../utils/apiFeatures");

exports.newProduct = async (req, res, next) => {
   const product = await Product.create(req.body);

   res.status(201).json({
      success: true,
      product,
   });
};

// GET ALL PRODUCTS /wrpl-database/products?name=apple
exports.getAllProducts = async (req, res, next) => {
   try {
      const resultPerPage = 2;

      const apiFeatures = new APIFeatures(Product.find(), req.query)
         .search()
         .filterByPrice()
         .pagination(resultPerPage);

      const products = await apiFeatures.query; // Fetch all products from the database

      res.status(200).json({
         counts: products.length,
         data: products, // Include the products in the response
      });
   } catch (error) {
      // Handle any errors that occur during the database operation
      res.status(500).json({
         success: false,
         message: "Error retrieving products",
         error: error.message,
      });
   }
};

// GET SINGLE PRODUCT /wrpl-database/product/:id
exports.getSingleProduct = async (req, res, next) => {
   const product = await Product.findById(req.params.id);

   if (!product) {
      return res.status(404).json({
         success: false,
         message: "Product Not Found",
      });
   }

   res.status(200).json({
      success: true,
      product,
   });
};

// UPDATE PRODUCT /wrpl-database/product/update/:id
exports.updateProduct = async (req, res, next) => {
   let product = await Product.findById(req.params.id);

   if (!product) {
      return res.status(404).json({
         success: false,
         message: "Product Not Found",
      });
   }

   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
   });

   res.send(200).json({
      success: true,
      product,
   });
};

// DELETE PRODUCTS /wrpl-database/product/delete/:id
exports.deleteProduct = async (req, res, next) => {
   const product = await Product.deleteOne({ _id: req.params.id });

   if (product.deletedCount === 0) {
      return res.status(404).json({
         success: false,
         message: "Product Not Found",
      });
   }

   res.status(200).json({
      success: true,
      message: "Product is Deleted",
   });
};
