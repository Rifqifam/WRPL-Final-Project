import React from "react";
import { NavLink } from "react-router-dom";
import "./productBlockfav.scss";
import { useUser } from "@clerk/clerk-react";

const ProductBlock = (props) => {
   const name = props.name;
   const image = props.image;
   const { user } = useUser();
   const API_URL = "http://localhost:4000/wrpl-database/";

   const handleRemove = async () => {
      try {
         const body = { name: name }; // Create an object with the name property
         await fetch(`${API_URL}fav/update/deletefav/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body), // Convert the object to a JSON string
         });
         window.location.reload();
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
