const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Please Enter Product Name"],
      trim: true,
      maxLength: [50, "Product Name can't exceed 50 characters"],
   },
   price: {
      type: Number,
      required: [true, "Please Enter Product Price"],
      maxLength: [15, "Product Price can't exceed 15 characters"],
      default: 0.0,
   },
   desc: {
      type: String,
      required: [true, "Please Enter Product Description"],
   },
   ratings: {
      type: Number,
      default: 0,
   },
   images: [
      {
         public_id: {
            type: String,
            default: "",
         },
         url: {
            type: String,
            default: "",
         },
      },
   ],
   category: {
      type: String,
      required: [true, "Please Enter Product Category"],
   },
   size: {
      type: String,
      required: [true, "Please Enter Product Size"],
      maxLength: [3, "Product Size can't exceed 3 characters"],
   },
   sellerid: {
      type: String,
      required: [true, "Please Enter Product Seller "],
   },
});

module.exports = mongoose.model("Product", productSchema);
