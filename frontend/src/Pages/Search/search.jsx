import React, { useState, useEffect } from "react";
import "./search.scss";
import { useParams } from "react-router-dom";
import ProductBlock from "../../Components/productBlock/productBlock";

const Search = () => {
   const API_URL = "http://localhost:4000/wrpl-database/";
   const { name } = useParams();
   const [products, setProducts] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(`${API_URL}/products?name=${name}`);
            const data = await response.json();
            setProducts(data.data);
         } catch (error) {
            console.error("Error 'fetchData':", error);
         }
      };
      fetchData();
   }, [name]);
   return (
      <>
         <div className='search_title'>
            <h1>Search : {name}</h1>
         </div>
         <div className='search_result'>
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

export default Search;
