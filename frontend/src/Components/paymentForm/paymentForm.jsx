import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CARD_OPTIONS = {
   iconStyle: "solid",
   style: {
      base: {
         iconColor: "#000",
         color: "#000",
         fontWeight: 600,
         fontFamily: "Montserrat, Open Sans, sans-serif",
         fontSize: "18px",
      },
      invalid: {
         iconColor: "#ffc7ee",
         color: "#ffc7ee",
      },
   },
};

export default function PaymentForm(props) {
   const API_URL = "http://localhost:4000/wrpl-database/";
   const { propsproducts, propstotalAmmount, propsuser_id } = props;
   const [successPayment, setSuccessPayment] = useState(false);
   const stripe = useStripe();
   const elements = useElements();

   const handlePaymentSubmit = async (e) => {
      e.preventDefault();
      const paymentMethodData = await stripe.createPaymentMethod({
         type: "card",
         card: elements.getElement(CardElement),
      });
      console.log(paymentMethodData);

      if (!paymentMethodData.error) {
         try {
            // const { id } = paymentMethodData.paymentMethod;
            const body = {
               user_id: propsuser_id,
               totalAmmount: propstotalAmmount,
               products: propsproducts,
            };
            const response = await fetch(`${API_URL}payment/add`, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(body),
            });

            const deleteRespone = await fetch(
               `${API_URL}cart/delete/${propsuser_id}`,
               {
                  method: "DELETE",
               }
            );
            console.log("Payment Successful");
            setSuccessPayment(true);
            localStorage.removeItem("paymentData");
         } catch (error) {
            console.error(error);
         }
      } else {
         console.log("no test passed");
         console.log(paymentMethodData.error.message);
      }
   };

   return (
      <>
         {!successPayment ? (
            <form onSubmit={handlePaymentSubmit}>
               <fieldset className='paymentForm-group'>
                  <div className='paymentFormRow'>
                     <CardElement options={CARD_OPTIONS} />
                  </div>
               </fieldset>
               <button type='submit'>Pay</button>
            </form>
         ) : (
            "You just successfully paid the items"
         )}

         {/* {propsproducts &&
            propsproducts.map((product) => (
               <div key={product.id}>
                  <p>{product.name}</p>
               </div>
            ))}
         <h1>{propstotalAmmount}</h1>
         <h1>{propsuser_id}</h1> */}
      </>
   );
}
