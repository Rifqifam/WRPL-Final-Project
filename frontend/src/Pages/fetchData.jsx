import React, { useEffect, useState } from "react";

const FetchData = () => {
   const API_URL = "http://localhost:4000/wrpl-database/";
   const [products, setProducts] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(`${API_URL}/products?page=1`);
            const data = await response.json();
            setProducts(data.data);
         } catch (error) {
            console.error("Error 'fetchData':", error);
         }
      };
      fetchData();
   }, []);

   return (
      <div>
         <h1>Product List</h1>
         <ul>
            {products.map((product) => (
               <li key={product._id}>{product.name}</li>
            ))}
         </ul>
      </div>
   );
};

export default FetchData;
