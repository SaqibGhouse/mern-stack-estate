import { useState } from "react";
import ListingsHeaders from "../../components/Header/ListingsHeaders";

const listings = [
  {
    title: "Modern Penthouse in the City",
    location: "785 Serene Shore Road, Willow Lake",
    price: "$3,400 / month",
    beds: 4,
    baths: 5,
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
  },
  {
    title: "Ultra-Modern Penthouse in Meadowville",
    location: "456 Serenity Lane, Meadowville",
    price: "$500 / month",
    beds: 6,
    baths: 5,
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
  },
  {
    title: "Modern Loft with Stunning Views",
    location: "101 Serene Shore Road, Willow Lake",
    price: "$1,200 / month",
    beds: 3,
    baths: 5,
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
  },
  {
    title: "Luxury Beachfront Villa",
    location: "902 Ocean Drive, Sunset Bay",
    price: "$5,000 / month",
    beds: 5,
    baths: 6,
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
  },
  {
    title: "Skyline Apartment with City View",
    location: "12 Highrise Lane, Downtown",
    price: "$2,500 / month",
    beds: 2,
    baths: 2,
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
  },
  {
    title: "Cozy Suburban House",
    location: "45 Maple Street, Greenfield",
    price: "$1,800 / month",
    beds: 3,
    baths: 3,
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
  },
];

const DisplayAddListings = () => {
  return (
    <div className="p-6">
    <ListingsHeaders/>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {listings.map((listing, index) => (
          <div
            key={index}
            className="w-full border rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{listing.title}</h3>
              <p className="text-sm text-gray-500">{listing.location}</p>
              <p className="font-bold mt-2">{listing.price}</p>
              <p className="text-sm text-gray-500">
                {listing.beds} Beds • {listing.baths} Baths
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayAddListings;
