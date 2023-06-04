import React from "react";
import { NavLink } from "react-router-dom";
import "./productBlock.scss";

const productBlock = (props) => {
   const name = props.name.replace(/ /g, "_").toLowerCase();
   const image = props.image;

   return (
      <>
         <NavLink to={`/product/${name}`} className='product_wrapper'>
            <article className='product'>
               <img src={image} alt={name} />
            </article>
         </NavLink>
      </>
   );
};

export default productBlock;
