import "./App.scss";
import {
   ClerkProvider,
   SignedIn,
   SignedOut,
   UserButton,
   useUser,
   RedirectToSignIn,
   useAuth,
} from "@clerk/clerk-react";
// Import Pages
// import FetchData from "./Pages/fetchData";

// if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
//    throw new Error("Missing Publishable Key");
// }
const clerkPubKey = "pk_test_Y3VycmVudC1jcmFuZS0xNy5jbGVyay5hY2NvdW50cy5kZXYk";

function App() {
   return (
      <ClerkProvider publishableKey={clerkPubKey}>
         <SignedIn>
            <Welcome />
         </SignedIn>
         <SignedOut>
            <RedirectToSignIn />
         </SignedOut>
      </ClerkProvider>
   );
}

function Welcome() {
   return (
      <div>
         <UserButton />
      </div>
   );
}

export default App;
