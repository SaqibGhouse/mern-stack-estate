import React from "react";

const UserListings = () => {
  // Sample data for user listings
  const listings = [
    { id: 1, name: "John Doe", img: "https://via.placeholder.com/50" },
    { id: 2, name: "Jane Smith", img: "https://via.placeholder.com/50" },
  ];

  return (
    <div className="space-y-6 max-w-3xl mt-20 mx-auto">
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-center space-x-4">
            <img
              src={listing.img}
              alt={`${listing.name} Profile`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-900">{listing.name}</h3>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200"
            >
              Edit
            </button>
            <button
              className="px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserListings;
