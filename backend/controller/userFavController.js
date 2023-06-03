const UserFav = require("../models/favorite");
const APIFeatures = require("../utils/apiFeatures");

// ADD ITEM CART => GET /wrpl-database/cart/add
exports.newFav = async (req, res, next) => {
   const userFav = await UserFav.create(req.body);

   res.status(201).json({
      success: true,
      userFav,
   });
};

// DELETE CART DELETE /wrpl-database/cart/delete/:id
exports.deleteFav = async (req, res, next) => {
   const user_id = req.params.id;
   const userFav = await UserFav.findOneAndDelete({ user_id: user_id });

   if (userFav.deletedCount === 0) {
      return res.status(404).json({
         success: false,
         message: "Favorite Not Found",
      });
   }

   res.status(200).json({
      success: true,
      message: "Favorite is Deleted",
   });
};

exports.updateFavAdd = async (req, res, next) => {
   const user_id = req.params.id;
   const addFav = req.body;

   let userFav = await UserFav.findOne({ user_id: user_id });

   if (!userFav) {
      return res.status(404).json({
         success: false,
         message: "Cart Not Found",
      });
   }

   // Concatenate addCart to activeCart
   userFav.favorites = userFav.favorites.concat(addFav);

   userFav = await UserFav.save();

   res.status(200).json({
      success: true,
      userFav,
   });
};

exports.updateFavDelete = async (req, res, next) => {
   const user_id = req.params.id;
   const deleteFavName = req.body.name;

   let userFav = await UserCart.findOne({ user_id: user_id });

   if (!userFav) {
      res.status(404).json({
         success: false,
         message: "cart not found",
      });
   }

   const activeFavWithName = userFav.favorites.filter(
      (item) => item.name !== deleteFavName
   );

   try {
      const updatedFav = await UserCart.findOneAndUpdate(
         { user_id: user_id },
         { $set: { activeCart: activeCartWithName } }
      );

      res.status(200).json({
         success: true,
         favorites: updatedFav.favorites,
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
exports.displayUserFav = async (req, res, next) => {
   const { user_id } = req.query;

   let userFav = await UserFav.findOne({ user_id: user_id });

   if (!userFav) {
      return res.status(404).json({
         success: false,
         message: "Fav Not Found",
      });
   }

   res.status(200).json({
      success: true,
      userFav,
   });
};
