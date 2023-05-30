const express = require("express");
const router = express.Router();

const {
   getAllProducts,
   newProduct,
   getSingleProduct,
   updateProduct,
   deleteProduct,
} = require("../controller/productController.js");

router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/admin/product/add").post(newProduct);
router.route("/admin/product/update/:id").put(updateProduct);
router.route("/admin/product/delete/:id").delete(deleteProduct);

module.exports = router;
