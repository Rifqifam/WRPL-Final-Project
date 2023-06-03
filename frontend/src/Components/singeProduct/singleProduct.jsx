import React, { useState, useEffect } from "react";
import "./singleProduct.scss";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { set } from "mongoose";

const SingleProduct = () => {
   const API_URL = "http://localhost:4000/wrpl-database/";
   const { name } = useParams();
   const { user } = useUser();

   const processed_name = name.replace("_", " ");
   const [product, setProduct] = useState(null);
   const [fav, setFav] = useState(false);
   const handleFav = async () => {
      try {
         const fullProduct = { product };
         const body = { name: fullProduct.product.name };
         const response = await fetch(`${API_URL}fav/check/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
         });
         const found = await response.json();
         console.log(found.found);
         if (found.found === true) {
            setFav(false);
         } else {
            setFav(true);
         }
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      const updateFavorite = async () => {
         if (fav) {
            try {
               const body = { product };
               await fetch(`${API_URL}fav/update/addfav/${user.id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body.product),
               });
            } catch (error) {
               console.error(error);
            }
         } else if (!fav) {
            try {
               const fullProduct = { product };
               const body = { name: fullProduct.product.name }; // Create an object with the name property
               await fetch(`${API_URL}fav/update/deletefav/${user.id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body), // Convert the object to a JSON string
               });
            } catch (error) {
               console.error(error);
            }
         }
      };
      updateFavorite();
   }, [fav]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(
               `${API_URL}/products?name=${processed_name}`
            );
            const data = await response.json();
            if (data.data.length > 0) {
               setProduct(data.data[0]);
            }
         } catch (error) {
            console.error("Error 'fetchData':", error);
         }
      };
      fetchData();
   }, []);

   if (!product) {
      return <div>Loading...</div>;
   }

   const processed_price = product.price
      ? product.price.toLocaleString("en", { useGrouping: true })
      : "";

   return (
      <>
         <div className='singleproduct_wrapper'>
            <div className='singleproduct_wrapper_product'>
               <div className='singleproduct_wrapper_product_leftcol'>
                  <img
                     src={product.images[0].url}
                     alt={product.images[0]._id}
                  />
               </div>
               <div className='singleproduct_wrapper_product_rightcol'>
                  <h1>{product.name}</h1>
                  <span className='singleproduct_wrapper_product_rightcol_gallery'>
                     {product.images.map((image) => (
                        <img src={image.url} alt={image._id} />
                     ))}
                  </span>

                  <div className='singleproduct_wrapper_product_rightcol_name'>
                     <h3>Ferdieo Azka Store</h3>
                     <p>Yogyakarta</p>
                  </div>

                  <div className='singleproduct_wrapper_product_rightcol_price'>
                     <p>Rp. {processed_price}</p>
                  </div>

                  <div className='singleproduct_wrapper_product_rightcol_favorites'>
                     <button onClick={handleFav} className='btn'>
                        <svg
                           width='33'
                           height='33'
                           viewBox='0 0 33 33'
                           fill={fav ? "#FF8A8A" : "none"}
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path
                              d='M28.655 6.33875C27.9527 5.63613 27.1188 5.07876 26.2011 4.69849C25.2833 4.31822 24.2997 4.12249 23.3062 4.12249C22.3128 4.12249 21.3291 4.31822 20.4114 4.69849C19.4936 5.07876 18.6598 5.63613 17.9575 6.33875L16.5 7.79625L15.0425 6.33875C13.6239 4.92017 11.6999 4.12323 9.69373 4.12323C7.68756 4.12323 5.76356 4.92017 4.34498 6.33875C2.9264 7.75733 2.12946 9.68133 2.12946 11.6875C2.12946 13.6937 2.9264 15.6177 4.34498 17.0362L5.80248 18.4937L16.5 29.1912L27.1975 18.4937L28.655 17.0362C29.3576 16.334 29.915 15.5001 30.2952 14.5824C30.6755 13.6646 30.8712 12.6809 30.8712 11.6875C30.8712 10.6941 30.6755 9.71039 30.2952 8.79264C29.915 7.87488 29.3576 7.04104 28.655 6.33875Z'
                              stroke={fav ? "#FF8A8A" : "#000000"}
                              stroke-width='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                           />
                        </svg>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default SingleProduct;
