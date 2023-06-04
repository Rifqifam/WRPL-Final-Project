import React from "react";
import { NavLink } from "react-router-dom";
import "./productBlockfav.scss";
import { useUser } from "@clerk/clerk-react";

const ProductBlock = (props) => {
   const name = props.name;
   const image = props.image;
   const productId = props.id;
   const API_URL = "http://localhost:4000/wrpl-database/";

   const handleRemove = async () => {
      try {
         await fetch(`${API_URL}admin/product/delete/${productId}`, {
            method: "DELETE",
         });
         window.location.reload();
         // console.log(productId);
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <>
         <article className='product_fav'>
            <button onClick={handleRemove}>x</button>
            <NavLink to={`/product/${name}`}>
               <img src={image} alt={name} />
            </NavLink>
         </article>
      </>
   );
};

export default ProductBlock;
