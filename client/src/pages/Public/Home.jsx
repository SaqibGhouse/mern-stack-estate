import React, { useState } from "react";
import bgImage from "../../assets/dashboard-main.jpg";
import { BsFillBuildingsFill, BsPinMap } from "react-icons/bs";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdOutlineApartment, MdOutlineHouse } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("search", searchTerm);
    const search = urlParams.toString();
    navigate(`/listings?${search}`);
  };
  return (
    <div className="h-auto w-auto bg-blue-300">
      <div className="relative w-full h-[75vh]">
        {/* Background image */}
        <img src={bgImage} className="w-full h-full object-cover" alt="" />

        {/* Black overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium text-white">
              You deserve a home
            </h1>
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-medium text-slate-300">
              You love
            </h1>
          </div>
          <div>
            <form
              onSubmit={handleSubmit}
              className="md:w-[30vw] lg:w-[35vw] xl:w-[40vw] mt-5"
            >
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:outline-none"
                  placeholder="Search Mockups, Logos..."
                  required
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium text-sm p-2 rounded-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="relative items-center justify-center hidden md:flex">
        <div className="w-1/2 h-max bg-white absolute -top-10 rounded-full shadow-md">
          <div className="flex text-center justify-center">
            <div className="p-4 lg:p-8">
              <BsFillBuildingsFill className="text-slate-600 text-2xl bg-blue-100 p-2 h-auto w-auto rounded-full" />
            </div>
            <div className="p-4 lg:p-8">
              <BsPinMap className="text-blue-500 text-2xl bg-green-200 p-2 h-auto w-auto rounded-full" />
            </div>
            <div className="p-4 lg:p-8">
              <HiOutlineOfficeBuilding className="text-yellow-600 text-2xl bg-gray-200 p-2 h-auto w-auto rounded-full" />
            </div>
            <div className="p-4 lg:p-8">
              <MdOutlineApartment className="text-purple-700 text-2xl bg-gray-200 p-2 h-auto w-auto rounded-full" />
            </div>
            <div className="p-4 lg:p-8">
              <MdOutlineHouse className="text-emerald-700 text-2xl bg-gray-200 p-2 h-auto w-auto rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
