const express = require("express");
const router = express.Router();

const {
   newFav,
   deleteFav,
   updateFavAdd,
   updateFavDelete,
   displayUserFav,
} = require("../controller/userFavController");

router.route("/fav").get(displayUserFav);
router.route("/fav/add").post(newFav);
router.route("/fav/delete/:id").delete(deleteFav);
router.route("/fav/update/addcart/:id").put(updateFavAdd);
router.route("/fav/update/deletecart/:id").put(updateFavDelete);

module.exports = router;