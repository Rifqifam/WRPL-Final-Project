import React, { useState, useEffect } from "react";
import "./favorites.scss";
import ProductBlockFav from "../../Components/productBlock_fav/productBlock";
import { useUser } from "@clerk/clerk-react";

const Homepage = () => {
   const API_URL = "http://localhost:4000/wrpl-database/";
   const [products, setProducts] = useState([]);
   const { user } = useUser();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(`${API_URL}fav?user_id=${user.id}`);
            const data = await response.json();
            setProducts(data.userFav.favorites);
         } catch (error) {
            console.error("Error 'fetchData':", error);
         }
      };
      fetchData();
   }, []);
   return (
      <>
         <div className='favorites_title'>
            <h1>Your Favorites</h1>
         </div>

         <div className='favorites_products_wrapper'>
            {products.length === 0 ? (
               <p className='favorites_products_wrapper_notfound'>
                  No Favorites Found
               </p>
            ) : (
               products.map((product) => (
                  <ProductBlockFav
                     name={product.name}
                     image={product.images[0].url}
                  />
               ))
            )}
         </div>
      </>
   );
};

export default Homepage;
