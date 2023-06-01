const UserCart = require("../models/userCart");
const APIFeatures = require("../utils/apiFeatures");

// ADD ITEM CART => GET /wrpl-database/cart/add
exports.newCart = async (req, res, next) => {
   const userCart = await UserCart.create(req.body);

   res.status(201).json({
      success: true,
      userCart,
   });
};

// DELETE CART DELETE /wrpl-database/cart/delete/:id
exports.deleteCart = async (req, res, next) => {
   const user_id = req.params.id;
   const userCart = await UserCart.findOneAndDelete({ user_id: user_id });

   if (userCart.deletedCount === 0) {
      return res.status(404).json({
         success: false,
         message: "Cart Not Found",
      });
   }

   res.status(200).json({
      success: true,
      message: "Cart is Deleted",
   });
};

exports.updateCartAdd = async (req, res, next) => {
   const user_id = req.params.id;
   const addCart = req.body;

   let userCart = await UserCart.findOne({ user_id: user_id });

   if (!userCart) {
      return res.status(404).json({
         success: false,
         message: "Cart Not Found",
      });
   }

   // Concatenate addCart to activeCart
   userCart.activeCart = userCart.activeCart.concat(addCart);

   userCart = await userCart.save();

   res.status(200).json({
      success: true,
      userCart,
   });
};

exports.updateCartDelete = async (req, res, next) => {
   const user_id = req.params.id;
   const deleteCartName = req.body.name;

   let userCart = await UserCart.findOne({ user_id: user_id });

   if (!userCart) {
      res.status(404).json({
         success: false,
         message: "cart not found",
      });
   }

   const activeCartWithName = userCart.activeCart.filter(
      (item) => item.name !== deleteCartName
   );

   try {
      const updatedCart = await UserCart.findOneAndUpdate(
         { user_id: user_id },
         { $set: { activeCart: activeCartWithName } }
      );

      res.status(200).json({
         success: true,
         activeCart: updatedCart.activeCart,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Internal server error",
         error: error.message,
      });
   }
};

// DISPLAY USER CART => /wrpl-database/cart?user_id={user_id}
exports.displayUserCart = async (req, res, next) => {
   const { user_id } = req.query;

   let userCart = await UserCart.findOne({ user_id: user_id });

   if (!userCart) {
      return res.status(404).json({
         success: false,
         message: "Cart Not Found",
      });
   }

   res.status(200).json({
      success: true,
      userCart,
   });
};
