import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.scss";

import { UserButton } from "@clerk/clerk-react";
import Search from "../../assets/logo/search.svg";
import Heart from "../../assets/logo/heart.svg";
import ShoppingCart from "../../assets/logo/shopping-cart.svg";

const Header = () => {
   const [searchActive, setSearchActive] = useState(false);
   const [search, setSearch] = useState("");
   const navigate = useNavigate();

   const handleSearchClick = () => {
      if (!searchActive) {
         setSearchActive(true);
      } else {
         setSearchActive(false);
      }
   };

   const handleInputChange = (e) => {
      setSearch(e.target.value);
   };

   const handleKeyPress = (e) => {
      if (e.key === "Enter") {
         redirectToSearch();
      }
   };

   const redirectToSearch = () => {
      if (search.trim() !== "") {
         setSearchActive(false);
         setSearch("");
         const processSearch = search.replace(/ /g, "_");
         navigate(`/search/${processSearch}`);
      }
   };

   useEffect(() => {
      console.log(search);
   }, [search]);

   return (
      <>
         <div className='header_wrapper'>
            <div className='header_wrapper_content'>
               <span className='search'>
                  <img
                     src={Search}
                     alt=''
                     className={searchActive ? "active" : ""}
                     onClick={handleSearchClick}
                  />
                  <input
                     type='text'
                     placeholder='search here'
                     className={searchActive ? "active" : ""}
                     onChange={handleInputChange}
                     onKeyPress={handleKeyPress}
                  />
               </span>
               <span className='favorite'>
                  <NavLink to='/cart'>
                     <img src={Heart} alt='' />
                  </NavLink>
               </span>
               <span className='cart'>
                  <NavLink to='/cart'>
                     <img src={ShoppingCart} alt='' />
                  </NavLink>
               </span>
               <span className='profile'>
                  <UserButton />
               </span>
            </div>
         </div>
      </>
   );
};

export default Header;
