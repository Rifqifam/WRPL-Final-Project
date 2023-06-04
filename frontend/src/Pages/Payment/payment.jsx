import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../../Components/paymentForm/paymentForm";

const Payment = () => {
   // !DATA FETCHING
   const [paymentData, setPaymentData] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);
   useEffect(() => {
      const data = JSON.parse(localStorage.getItem("paymentData"));
      setPaymentData(data);
      setIsLoaded(true);
   }, []);
   console.log("payment.jsx: 15", paymentData);

   // !STRIPE API
   const PUBLIC_STRIPE_KEY =
      "pk_test_51NFAyDJd0zvfy1LHhTHpIKhhScFwWWlEhG8sWRdKReB0vVDSfGq2nTMP4JxKqXIJOsRAD61qjlHR6CTz9EJ1xkD000DNTsEHXf";
   const stripeTestPromise = loadStripe(PUBLIC_STRIPE_KEY);

   // !RENDERING SIDE

   if (!isLoaded) {
      return <div>Loading...</div>; // Render a loading state until data is loaded
   }
   return (
      <>
         <Elements stripe={stripeTestPromise}>
            <PaymentForm
               propsproducts={paymentData.products}
               propstotalAmmount={paymentData.totalAmmount}
               propsuser_id={paymentData.user_id}
            />
         </Elements>
      </>
   );
};

export default Payment;
