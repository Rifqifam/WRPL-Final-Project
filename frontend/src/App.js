import "./App.scss";
import { ClerkProvider, SignedIn, SignIn, SignedOut } from "@clerk/clerk-react";

import {
   NavLink,
   BrowserRouter as Router,
   Routes,
   Route,
} from "react-router-dom";

import Header from "./layout/Header/Header";
import Homepage from "./Pages/Homepage/Homepage";
import Favorites from "./Pages/Favorites/favorites";
import SingleProduct from "./Components/singeProduct/singleProduct";
import Search from "./Pages/Search/search";
import AdminPage from "./Pages/Admin/admin";

const clerkPubKey = "pk_test_Y3VycmVudC1jcmFuZS0xNy5jbGVyay5hY2NvdW50cy5kZXYk";

function App() {
   return (
      <>
         <div className='app_wrapper'>
            <ClerkProvider publishableKey={clerkPubKey}>
               <Router>
                  <SignedOut>
                     <div className='app_wrapper_signedoutstate'>
                        <SignIn afterSignInUrl='/' />
                     </div>
                  </SignedOut>
                  <SignedIn>
                     <Header />
                     <Routes>
                        <Route path='/' element={<Homepage />} />
                        <Route path='/favorites' element={<Favorites />} />
                        <Route path='/search/:name' element={<Search />} />
                        <Route path='/admin' element={<AdminPage />} />
                        <Route
                           path='/product/:name'
                           element={<SingleProduct />}
                        />
                     </Routes>
                  </SignedIn>
               </Router>
            </ClerkProvider>
         </div>
      </>
   );
}

export default App;
