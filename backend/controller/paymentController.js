const Payment = require("../models/payment");
const APIFeatures = require("../utils/apiFeatures");
const stripe = require("stripe")(
   "sk_test_51NFAyDJd0zvfy1LHDR8W0T06cvCE4xgCYXgjX7QVlM5XVKhGANFsSDqjWQ2h1R2KlcgwkbpNwH2J6O1qaQmIxw4o00exrKmpjH"
);

exports.newPayment = async (req, res, next) => {
   const body = req.body;

   let paymentData = await Payment.create(body);
   try {
      // const payment = await stripe.paymentIntents.create({
      //    amount: amount,
      //    currency: "USD",
      //    description: user_id,
      //    confirm: true,
      // });
      res.status(201).json({
         success: true,
         message: "Payment Successful",
         paymentData,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error adding Payments",
         error: error.message,
      });
   }
};

exports.getPayment = async (req, res, next) => {
   const payment = await Payment.find();
   try {
      res.status(201).json({
         success: true,
         payment,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Error adding Payments",
         error: error.message,
      });
   }
};
