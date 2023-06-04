import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.scss";

import { UserButton, useUser } from "@clerk/clerk-react";
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

   const { user } = useUser();
   const userRole = user.organizationMemberships[0].role;
   const [admin, setAdmin] = useState(false);

   useEffect(() => {
      if (userRole === "admin") {
         setAdmin(true);
      } else {
         setAdmin(false);
      }
   }, [userRole]);

   useEffect(() => {
      console.log(search);
   }, [search]);

   return (
      <>
         <div className='header_wrapper'>
            <div className='header_wrapper_logo'>
               <NavLink to='/'>
                  <h2>prelovedgoods.id</h2>
               </NavLink>
            </div>
            <div className='header_wrapper_content'>
               {admin && (
                  <span className='adminpage'>
                     <p>
                        <NavLink to='/admin'>Admin Page</NavLink>
                     </p>
                  </span>
               )}
               <span className='search'>
                  <input
                     type='text'
                     placeholder='search here'
                     className={searchActive ? "active" : ""}
                     onChange={handleInputChange}
                     onKeyPress={handleKeyPress}
                  />
                  <img
                     src={Search}
                     alt=''
                     className={searchActive ? "active" : ""}
                     onClick={handleSearchClick}
                  />
               </span>
               <span className='favorite'>
                  <NavLink to='/favorites'>
                     <img src={Heart} alt='' />
                  </NavLink>
               </span>
               <span className='cart'>
                  <NavLink to='/cart'>
                     <img src={ShoppingCart} alt='' />
                  </NavLink>
               </span>
               <span className='profile'>
                  <UserButton afterSignOutUrl='/' />
               </span>
            </div>
         </div>
      </>
   );
};

export default Header;
