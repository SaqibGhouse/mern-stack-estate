import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserListings = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [listingData, setListingData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchUserListings();
  }, []);

  const fetchUserListings = async () => {
    setLoader(true);
    try {
      let res = await fetch(
        `/api/v1/listing/fetchUserListings/${currentUser._id}`
      );
      const data = await res.json();
      setListingData(data.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching user listings:", error);
    }
  };

  if (loader) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
      </div>
    );
  }

  const deleteListingById = async (id) => {
    console.log(listingData);
    try {
      let res = await fetch(`/api/v1/listing/deleteListingById/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.isValid) {
        console.log(data.data);
        setListingData((prev) => prev.filter((listing) => listing._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mt-20 mx-auto space-y-4">
      {/* Scrollable Listings Container */}
      {listingData && (
        <div className="space-y-6 overflow-y-auto max-h-[500px]">
          {listingData.map((listing) => (
            <div
              key={listing._id}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={listing.imageUrls[0]}
                  alt={`${listing.name} Profile`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  {listing.name}
                </h3>
              </div>

              <div className="flex items-center space-x-4">
                <Link to={`/updateUserlisting/${listing._id}`}>
                  <button className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200">
                    Edit
                  </button>
                </Link>
                <button
                  className="px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
                  onClick={() => deleteListingById(listing._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Listing Button */}
      <div className="flex justify-center mt-4">
        <Link to={"/listing"}>
          <button
            type="button"
            className="flex-1 bg-green-700 text-white rounded-lg p-2 uppercase hover:opacity-80"
          >
            Create Listing
          </button>
        </Link>
      </div>
    </div>
  );

  // return (
  //   <div className="space-y-6 max-w-3xl mt-20 mx-auto">
  //     {listingData.map((listing) => (
  //       <div
  //         key={listing._id}
  //         className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
  //       >
  //         <div className="flex items-center space-x-4">
  //           <img
  //             src={listing.imageUrls[0]}
  //             alt={`${listing.name} Profile`}
  //             className="w-12 h-12 rounded-full object-cover"
  //           />
  //           <h3 className="text-lg font-semibold text-gray-900">
  //             {listing.name}
  //           </h3>
  //         </div>

  //         <div className="flex items-center space-x-4">
  //           <button className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200">
  //             Edit
  //           </button>
  //           <button className="px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200">
  //             Delete
  //           </button>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default UserListings;
