import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaBed, FaBath, FaCar, FaCheck } from "react-icons/fa";
import { MdChair } from "react-icons/md";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-flip";
import "swiper/css/parallax";

const ViewListing = () => {
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(true);

  const params = useParams();

  useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = async () => {
    try {
      const listingId = params.id;
      const res = await fetch(`/api/v1/listing/fetchListingById/${listingId}`);
      const data = await res.json();
      if (data.isValid) {
        setLoader(false);
        setListing(data.data);
        console.log(data.data);
      } else {
        setError(data.message);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loader) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {listing && !loader && !error && (
          <>
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                grabCursor={true}
                loop={true}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: true,
                }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <img
                      src={url} // Use the dynamic URL here
                      alt="Property"
                      className="w-full h-96 object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow z-50">
                For {listing.type == "sell" ? "Sale" : "Rent"}
              </div>
            </div>

            <div className="p-6">
              {/* Title and Location */}
              <h1 className="text-3xl font-bold text-gray-800">
                {listing.name} - ${listing.price}
              </h1>
              <p className="text-gray-500 mt-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                {listing.address}
              </p>

              {/* Description */}
              <p className="text-gray-600 mt-4 leading-relaxed">
                {listing.description}
              </p>

              {/* Property Details */}
              <div className="flex flex-wrap items-center justify-between mt-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaBed className="text-green-500" />
                    <span>{listing.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaBath className="text-blue-500" />
                    <span>{listing.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaCar className="text-yellow-500" />
                    <span>
                      {listing.parking ? "Parking Available" : "No Parking"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MdChair className="text-gray-500" />
                    <span>
                      {" "}
                      {listing.furnished ? "Furnished" : "Not Furnished"}{" "}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Button */}
              <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition">
                Contact Landlord
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewListing;
