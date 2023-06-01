import "./App.scss";
import {
   ClerkProvider,
   SignedIn,
   SignIn,
   SignedOut,
   useUser,
   useClerk,
} from "@clerk/clerk-react";

import {
   NavLink,
   BrowserRouter as Router,
   Routes,
   Route,
} from "react-router-dom";

import Header from "./layout/Header/Header";
import Homepage from "./Pages/Homepage/Homepage";

const clerkPubKey = "pk_test_Y3VycmVudC1jcmFuZS0xNy5jbGVyay5hY2NvdW50cy5kZXYk";

function App() {
   return (
      <>
         <div className='app_wrapper'>
            <ClerkProvider publishableKey={clerkPubKey}>
               <Router>
                  <Header />
                  <Routes>
                     <Route path='/' element={<Homepage />} />
                  </Routes>
               </Router>
            </ClerkProvider>
         </div>
      </>
   );
}

export default App;
