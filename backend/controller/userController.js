const User = require("../models/user");
const APIFeatures = require("../utils/apiFeatures");

exports.newUser = async (req, res, next) => {
   const user = await User.create(req.body);

   res.status(201).json({
      success: true,
      user,
   });
};

exports.getAllUsers = async (req, res, next) => {
   try {
      const users = await User.find();

      res.status(200).json({
         counts: users.length,
         data: users,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error retrieving users",
         error: error.message,
      });
   }
};
