import React, { useEffect, useState } from "react";
import "./admin.scss";
import { NavLink } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import RenderAdminPage from "../../Components/adminpageContent/adminPageContent";

const Admin = () => {
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

   if (admin) {
      return (
         <>
            <div className='adminpage_title'>
               <h1 className='adminpage_title_text'>
                  Welcome to admin page
                  <span> {user.username}</span>
                  <RenderAdminPage />
               </h1>
            </div>
         </>
      );
   } else {
      return (
         <>
            <h1>Sorry you are not an admin</h1>
            <NavLink to='/'>Back to Homepage</NavLink>
         </>
      );
   }
};

export default Admin;
