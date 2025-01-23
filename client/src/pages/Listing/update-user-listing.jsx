import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
  import React, { useEffect, useState } from "react";
  import { app } from "../../../firebase";
  import { useSelector } from "react-redux";
  import { useNavigate, useParams } from "react-router-dom";
  
  const UpdateUserlisting = () => {
    const navigate = useNavigate();
    const params = useParams();
  
    useEffect(() => {
        fetchUserListing();
    }, [])
    

    const { currentUser } = useSelector((state) => state.user);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [submitFormData, setsubmitFormData] = useState({
      imageUrls: [],
      name: "",
      description: "",
      type: "rent",
      bedrooms: 1,
      bathrooms: 1,
      price: 50,
      parking: false,
      furnished: false,
      address: "",
    });
    const [imageUploading, setImageUploading] = useState(false);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
  

    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 6 && files.length < 7) {
        return;
      } else {
        setSelectedFiles(files);
      }
    };
  
    const uploadImages = () => {
      if (selectedFiles.length > 0 && selectedFiles.length < 7) {
        setImageUploading(true);
        const promise = [];
        for (let i = 0; i < selectedFiles.length; i++) {
          promise.push(storeUploadedImage(selectedFiles[i]));
        }
        Promise.all(promise)
          .then((urls) => {
            setsubmitFormData({
              ...submitFormData,
              imageUrls: submitFormData.imageUrls.concat(urls),
            });
            setImageUploading(false);
          })
          .catch((err) => {
            setImageUploading(false);
            console.log(err);
          });
      } else {
        alert("You can only upload 6 images");
      }
    };
  
    const storeUploadedImage = async (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const imageName = new Date().getTime() + file.name;
        const fbRef = ref(storage, imageName);
        const uploadImageToFirebase = uploadBytesResumable(fbRef, file);
        uploadImageToFirebase.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadImageToFirebase.snapshot.ref).then((imgUrl) => {
              resolve(imgUrl);
            });
          }
        );
      });
    };
  
    const handleDeleteImage = (index) => {
      setsubmitFormData({
        ...submitFormData,
        imageUrls: submitFormData.imageUrls.filter((_, i) => i !== index),
      });
    };
  
    const handleInputChange = (e) => {
      if (e.target.id === "sell" || e.target.id === "rent") {
        setsubmitFormData({
          ...submitFormData,
          type: e.target.id,
        });
      }
  
      if (e.target.id === "parking" || e.target.id === "furnished") {
        setsubmitFormData({
          ...submitFormData,
          [e.target.id]: e.target.checked,
        });
      }
  
      if (
        e.target.type === "number" ||
        e.target.type === "text" ||
        e.target.type === "textarea"
      ) {
        setsubmitFormData({
          ...submitFormData,
          [e.target.id]: e.target.value,
        });
      }
    };
  
    const submitListingForm = async (e) => {
      e.preventDefault();
  
      try {
        if (submitFormData.imageUrls.length < 1) {
          return setError("Please upload atleast one image");
        }
  
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/v1/listing/updateListingById/${params.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...submitFormData,
            userRef: currentUser._id,
          }),
        });
  
        const data = await res.json(); // changed JSON() to json()
        setLoading(false);
  
        if (data.isValid) {
          navigate(`/userListing`);
        } else {
          setError(data.message); // display error message from response if available
        }
      } catch (err) {
        setError(err.message); // display error message from the caught error
      }
    };
  
    const fetchUserListing = async () => {  
        const listingId = params.id;
        const res = await fetch(`/api/v1/listing/fetchListingById/${listingId}`);
        const data = await res.json();
        if (data.isValid) {
          setsubmitFormData(data.data);
        } else {
          setError(data.message);
        }
    }
    return (
      <>
        <form onSubmit={submitListingForm}>
          <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-20">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Update Listing
            </h1>
  
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                required
                id="name"
                onChange={handleInputChange}
                value={submitFormData.name}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
  
              <textarea
                rows="3"
                placeholder="Description"
                required
                id="description"
                onChange={handleInputChange}
                value={submitFormData.description}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              ></textarea>
  
              <input
                type="text"
                placeholder="Address"
                required
                id="address"
                onChange={handleInputChange}
                value={submitFormData.address}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
  
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value="sell"
                    id="sell"
                    className="text-indigo-600"
                    onChange={handleInputChange}
                    checked={submitFormData.type === "sell"}
                  />
                  <span>Sell</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value="rent"
                    id="rent"
                    className="text-indigo-600"
                    onChange={handleInputChange}
                    checked={submitFormData.type === "rent"}
                  />
                  <span>Rent</span>
                </label>
              </div>
  
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="parking"
                    onChange={handleInputChange}
                    checked={submitFormData.parking}
                  />
                  <span>Parking Spot</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="furnished"
                    onChange={handleInputChange}
                    checked={submitFormData.furnished}
                  />
                  <span>Furnished</span>
                </label>
              </div>
  
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="1"
                  placeholder="Beds"
                  required
                  id="bedrooms"
                  onChange={handleInputChange}
                  value={submitFormData.bedrooms}
                  className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Baths"
                  required
                  id="bathrooms"
                  onChange={handleInputChange}
                  value={submitFormData.bathrooms}
                  className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
  
              <input
                type="number"
                min="50"
                required
                id="price"
                onChange={handleInputChange}
                value={submitFormData.price}
                placeholder="Regular Price ($ / Month)"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
  
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="flex-1 border border-gray-300 p-2 rounded-md"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  onClick={uploadImages}
                >
                  {imageUploading ? "Uploading..." : "Upload"}
                </button>
              </div>
              {error && error}
  
              <div className="flex justify-center gap-3 mt-4">
                <button
                  type="button"
                  className="flex-1 bg-orange-700 text-white rounded-md py-3 uppercase hover:opacity-80 transition"
                  onClick={() => navigate(`/userListing`)}
                >
                  View Listing
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
                  disabled={loading ? true : false}
                >
                  {loading ? "Updating..." : "Update Listing"}
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
            {submitFormData.imageUrls.length > 0 &&
              submitFormData.imageUrls.map((url, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={url}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    className="mt-2 font-bold text-red-700 hover:underline"
                    onClick={() => handleDeleteImage(index)}
                  >
                    DELETE
                  </button>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  };
  
  export default UpdateUserlisting;
  