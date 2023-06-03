const UserFav = require("../models/favorite");
const APIFeatures = require("../utils/apiFeatures");

// ADD ITEM TO FAVORITES => POST /wrpl-database/fav/add
exports.newFav = async (req, res, next) => {
   try {
      const userFav = await UserFav.create(req.body);

      res.status(201).json({
         success: true,
         userFav,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Internal server error",
         error: error.message,
      });
   }
};

// DELETE FAVORITE => DELETE /wrpl-database/fav/delete/:id
exports.deleteFav = async (req, res, next) => {
   try {
      const user_id = req.params.id;
      const userFav = await UserFav.findOneAndDelete({ user_id: user_id });

      if (!userFav) {
         return res.status(404).json({
            success: false,
            message: "Favorite Not Found",
         });
      }

      res.status(200).json({
         success: true,
         message: "Favorite is Deleted",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Internal server error",
         error: error.message,
      });
   }
};

// ADD FAVORITE TO USER FAVORITES => PUT /wrpl-database/fav/add/:id
exports.updateFavAdd = async (req, res, next) => {
   try {
      const user_id = req.params.id;
      const addFav = req.body;

      let userFav = await UserFav.findOne({ user_id: user_id });

      if (!userFav) {
         return res.status(404).json({
            success: false,
            message: "Favorite Not Found",
         });
      }

      // Concatenate addFav to favorites array
      userFav.favorites = userFav.favorites.concat(addFav);

      userFav = await userFav.save();

      res.status(200).json({
         success: true,
         userFav,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Internal server error",
         error: error.message,
      });
   }
};

exports.checkItem = async (req, res, next) => {
   try {
      const user_id = req.params.id;
      const foundName = req.body.name;

      let userFav = await UserFav.findOne({ user_id: user_id });
      const updatedFavorites = userFav.favorites.filter(
         (item) => item.name === foundName
      );

      if (!userFav) {
         return res.status(404).json({
            success: false,
            found: false,
            message: "User Favorite Not Found",
         });
      } else if (updatedFavorites.length > 0) {
         return res.status(200).json({
            found: true,
         });
      }
      res.status(200).json({
         success: false,
         found: false,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Internal server error",
         error: error.message,
      });
   }
};

// REMOVE FAVORITE FROM USER FAVORITES => PUT /wrpl-database/fav/delete/:id
exports.updateFavDelete = async (req, res, next) => {
   try {
      const user_id = req.params.id;
      const deleteFavName = req.body.name;

      let userFav = await UserFav.findOne({ user_id: user_id });

      if (!userFav) {
         return res.status(404).json({
            success: false,
            message: "Favorite Not Found",
         });
      }

      const updatedFavorites = userFav.favorites.filter(
         (item) => item.name !== deleteFavName
      );

      userFav.favorites = updatedFavorites;

      userFav = await userFav.save();

      res.status(200).json({
         success: true,
         userFav,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Internal server error",
         error: error.message,
      });
   }
};

// DISPLAY USER FAVORITES => GET /wrpl-database/fav?user_id={user_id}
exports.displayUserFav = async (req, res, next) => {
   try {
      const { user_id } = req.query;

      let userFav = await UserFav.findOne({ user_id: user_id });

      if (!userFav) {
         return res.status(404).json({
            success: false,
            message: "Favorites Not Found",
         });
      }

      res.status(200).json({
         success: true,
         userFav,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Internal server error",
         error: error.message,
      });
   }
};
