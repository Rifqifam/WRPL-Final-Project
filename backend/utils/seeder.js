const Product = require("../models/product");
const User = require("../models/userCart.js");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const products = require("../data/productSeeder.json");
const users = require("../data/userSeeder.json");

// Setting DOTENV FILE
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedProducts = async () => {
   try {
      // Deleted all products then insert from a default database

      await Product.deleteMany();
      console.log("All Products Are Deleted!");

      await Product.insertMany(products);
      console.log("Default Dummy Products Are inserted");

      process.exit();
   } catch (error) {
      console.log(error.message);

      process.exit();
   }
};

const seedUser = async () => {
   try {
      // Delete All Users in Database then insert from a default Database

      await User.deleteMany();
      console.log("All Users Are Deleted");

      await User.insertMany(users);
      console.log("All Dummy Users are Inserted");

      process.exit();
   } catch (error) {
      console.log(error.message);

      process.exit();
   }
};

seedProducts();
// seedUser();
