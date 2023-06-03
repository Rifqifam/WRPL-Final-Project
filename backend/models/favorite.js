const mongoose = require("mongoose");

const userFavSchema = new mongoose.Schema({
   user_id: {
      type: String,
      required: true,
   },
   favorites: [
      {
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
                  required: true,
               },
               url: {
                  type: String,
                  required: true,
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
         seller: {
            type: String,
            required: [true, "Please Enter Product Seller "],
         },
         amount: {
            type: Number,
            default: 1,
         },
      },
   ],
});

module.exports = mongoose.model("UserFav", userFavSchema);
