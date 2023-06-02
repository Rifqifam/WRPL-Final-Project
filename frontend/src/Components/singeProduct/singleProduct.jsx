import React, { useState, useEffect } from "react";
import "./singleProduct.scss";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
   const API_URL = "http://localhost:4000/wrpl-database/";
   const { name } = useParams();
   const processed_name = name.replace("_", " ");

   const [product, setProduct] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(
               `${API_URL}/products?name=${processed_name}`
            );
            const data = await response.json();
            setProduct(data.data);
         } catch (error) {
            console.error("Error 'fetchData':", error);
         }
      };
      fetchData();
   }, []);
   console.log(product[0].name);

   return (
      <>
         <div className='singleproduct_wrapper'>
            <div className='singleproduct_wrapper_product'>
               <div className='singleproduct_wrapper_product_leftcol'>
                  <img
                     src={product[0].images[0].url}
                     alt={product[0].images[0]._id}
                  />
               </div>
               <div className='singleproduct_wrapper_product_rightcol'>
                  <h1>{product[0].name}</h1>
                  <span className='singleproduct_wrapper_product_rightcol_gallery'>
                     {product[0].images.map((image) => (
                        <img src={image.url} alt={image._id} />
                     ))}
                  </span>
               </div>
            </div>
         </div>
      </>
   );
};

export default SingleProduct;
