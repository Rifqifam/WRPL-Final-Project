import React, { useState, useEffect } from "react";
import "./singleProduct.scss";
import { useParams } from "react-router-dom";
import {
   ClerkProvider,
   SignedIn,
   SignIn,
   SignedOut,
   useUser,
   useOrganization,
} from "@clerk/clerk-react";

const SingleProduct = () => {
   const API_URL = "http://localhost:4000/wrpl-database/";
   const { name } = useParams();
   const { user } = useUser();
   const { membershipList } = useOrganization();

   const processed_name = name.replace("_", " ");
   const [product, setProduct] = useState(null);

   const updateFavorite = () => {};

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

   console.log(membershipList);

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
                     <button>Fav</button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default SingleProduct;
