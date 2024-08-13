import Header from "./components/Header/Header.jsx";
import SignIn from "./pages/Authentication/SignIn.jsx";
import Home from "./pages/Public/Home.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from './pages/Authentication/SignUp.jsx'
import About from './pages/Public/About.jsx'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
import Profile from "./pages/Protected/Profile.jsx";
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
          <Route element={<PrivateRoute/>} >
            <Route path="profile" element={<Profile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default app;