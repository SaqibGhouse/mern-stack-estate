import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-[#49606A] p-3 pt-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-white-500 mr-1"><Link to="/">MERN</Link> </span>
          <span className="text-white"><Link to="/">Real</Link></span>
        </h1>
        <div className="flex bg-white p-1 rounded-full px-0 sm:px-8">
          <div className="pt-1 pr-4">
            <span className="hover:text-gray-500 hover:underline text-green-950  font-bold transition">
            <Link to="/">Home</Link>
            </span>
          </div>
          <div className="p-1">
            <span className="hover:text-gray-500 hover:underline text-green-950  font-bold  transition">
              About
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-center relative">
            <div>
              {currentUser ? (
                <div className="">
                  <Link to="/profile">
                    <img
                      className="rounded-full right-16 h-10 w-10 mb-0"
                      src={currentUser.avatar ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                      alt="profile"
                    />
                  </Link>
                </div>
              ) : (
                <FaRegUserCircle className="text-4xl " />
              )}
            </div>
            <div>
              {currentUser ? (
                <span className="ps-2"></span>
              ) : (
                <span className="ml-3 text-lg">
                  <Link to="/signin">Sign In</Link>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
