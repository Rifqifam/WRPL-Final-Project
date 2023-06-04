const express = require("express");
const router = express.Router();

const {
   newCart,
   deleteCart,
   updateCartAdd,
   updateCartDelete,
   displayUserCart,
   checkItem,
} = require("../controller/userCartController");

router.route("/cart").get(displayUserCart);
router.route("/cart/add").post(newCart);
router.route("/cart/check/:id").put(checkItem);
router.route("/cart/delete/:id").delete(deleteCart);
router.route("/cart/update/addcart/:id").put(updateCartAdd);
router.route("/cart/update/deletecart/:id").put(updateCartDelete);

module.exports = router;
