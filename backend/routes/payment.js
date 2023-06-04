const express = require("express");
const router = express.Router();

const { newPayment, getPayment } = require("../controller/paymentController");

// router.route("/fav").get(displayUserFav);
router.route("/payment/add").post(newPayment);
router.route("/payments").get(getPayment);

module.exports = router;
