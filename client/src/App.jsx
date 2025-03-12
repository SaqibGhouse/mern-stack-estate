import Header from "./components/Header/Header.jsx";
import SignIn from "./pages/Authentication/SignIn.jsx";
import Home from "./pages/Public/Home.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from './pages/Authentication/SignUp.jsx'
import About from './pages/Public/About.jsx'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
import Profile from "./pages/Protected/Profile.jsx";
import CreateListing from "./pages/Listing/create-listing.jsx";
import UserListings from "./pages/Listing/userListings.jsx";
import UpdateUserlisting from "./pages/Listing/update-user-listing.jsx";
import ViewListing from "./pages/Listing/ViewListing.jsx";
import DisplayAddListings from "./pages/Listing/DisplayAddListings.jsx";


const app = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/ViewListing/:id" element={<ViewListing/>} />
          <Route path="/listings" element={<DisplayAddListings/>} />
          <Route element={<PrivateRoute/>} >
            <Route path="profile" element={<Profile/>} />
            <Route path="listing" element={<CreateListing/>} />
            <Route path="userListing" element={<UserListings/>} />
            <Route path="updateUserlisting/:id" element={<UpdateUserlisting/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default app;