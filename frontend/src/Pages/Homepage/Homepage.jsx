import React, { useState, useEffect } from "react";
import "./homepage.scss";
import ProductBlock from "../../Components/productBlock/productBlock";

const Homepage = () => {
   const API_URL = "http://localhost:4000/wrpl-database/";
   const [products, setProducts] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(`${API_URL}/products`);
            const data = await response.json();
            setProducts(data.data);
         } catch (error) {
            console.error("Error 'fetchData':", error);
         }
      };
      fetchData();
   }, []);
   return (
      <>
         <div className='homepage_title'>
            <h1>prelovedgoods.id</h1>
            <p>where your preloved finds love</p>
         </div>

         <div className='homepage_products_wrapper'>
            {products.map((product) => (
               <ProductBlock
                  name={product.name}
                  image={product.images[0].url}
               />
            ))}
         </div>
      </>
   );
};

export default Homepage;
