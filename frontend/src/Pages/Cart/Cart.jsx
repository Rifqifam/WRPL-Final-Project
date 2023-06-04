import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./cart.scss";
import { useParams } from "react-router-dom";
import CartItem from "../../Components/cartItem/cartItem"; // Adjust the file path accordingly
import { useUser } from "@clerk/clerk-react";

const Cart = () => {
   const [products, setProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(true); // Add isLoading state
   const [totalPrice, setTotalPrice] = useState(""); // Add isLoading state
   const { user } = useUser();
   const API_URL = "http://localhost:4000/wrpl-database/";

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(`${API_URL}cart?user_id=${user.id}`, {
               method: "GET",
            });
            const data = await response.json();
            const userCart = await data.userCart.activeCart;
            setProducts(userCart);
            setIsLoading(false); // Set isLoading to false after fetching data
         } catch (error) {
            console.error("Error 'fetchData':", error);
            setIsLoading(false); // Set isLoading to false in case of an error
         }
      };
      const calculateTotalPrice = () => {
         let totalPriceX = 0;
         products.forEach((product) => {
            totalPriceX += product.price;
         });
         return totalPriceX;
      };
      fetchData();
      setTotalPrice(calculateTotalPrice());
   }, [products]);

   // localStorage.setItem(
   //    "myData",
   //    JSON.stringify({ key: "value", name: "rifqi" })
   // );

   if (isLoading) {
      return <div>Loading...</div>; // Render a loading state while fetching data
   }

   const handleRemove = async (input) => {
      const name = input;
      try {
         const body = { name: name }; // Create an object with the name property
         await fetch(`${API_URL}cart/update/deletecart/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body), // Convert the object to a JSON string
         });
         window.location.reload();
      } catch (error) {
         console.error(error);
      }
   };

   const handlePayment = () => {
      localStorage.setItem(
         "paymentData",
         JSON.stringify({
            user_id: user.id,
            products,
            totalAmmount: totalPrice,
         })
      );
   };

   return (
      <div className='cart_wrapper'>
         <div className='cart_wrapper_leftcol'>
            <table className='cart_wrapper_leftcol_table'>
               <thead className='cart_wrapper_leftcol_table_header'>
                  <th>Shopping Cart</th>
                  <th>Price</th>
                  <th></th>
               </thead>
               <tbody className='cart_wrapper_leftcol_table_body'>
                  {products.map((product) => (
                     <>
                        <tr>
                           <td>{product.name}</td>
                           <td>
                              Rp.{" "}
                              {product.price.toLocaleString("en", {
                                 useGrouping: true,
                              })}
                           </td>
                           <td className='delete'>
                              <button
                                 onClick={() => handleRemove(product.name)}
                              >
                                 X
                              </button>
                           </td>
                        </tr>
                     </>
                  ))}
               </tbody>
            </table>
         </div>
         <div className='cart_wrapper_rightcol'>
            <div className='cart_wrapper_rightcol_box_my_cart'>
               <h1 className='boxTitle'>My Cart</h1>
               <div className='cart_wrapper_rightcol_box_my_cart_items'>
                  {products.map((product) => (
                     <>
                        <h2>{product.name}</h2>
                     </>
                  ))}
               </div>
               <div className='cart_wrapper_rightcol_box_my_cart_total'>
                  <div className='line'></div>
                  <p className='title_total'>Total:</p>
                  <h1 className='price_total'>
                     Rp.
                     {totalPrice.toLocaleString("en", {
                        useGrouping: true,
                     })}
                  </h1>
                  <div className='cart_wrapper_rightcol_box_my_cart_total_checkoutBtn'>
                     <NavLink to='/payment' onClick={handlePayment}>
                        <button className='btn'>Checkout</button>
                     </NavLink>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Cart;
