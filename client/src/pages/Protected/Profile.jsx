import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../firebase";
import {
  updateUserError,
  updateUserSucc,
  startUpdateUser,
  deleteUserStart,
  deleteuserFailed,
  deleteUserSuccessFull,
  signInStart,
  signInSuccess,
  signOutUserFailed,
} from "../../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [isFileUploading, setIsFileUploading] = useState(0);
  const [FileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    // Check if the file size is more than 1 MB (1 MB = 1024 * 1024 bytes)
    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      alert('File size exceeds the 1 MB limit. Please upload a smaller file.');
      return; // Prevent upload if file is too large
    }
  
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const imageStore = ref(storage, fileName);
    const uploadAvatar = uploadBytesResumable(imageStore, file);
  
    uploadAvatar.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setIsFileUploading(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadAvatar.snapshot.ref).then((downloadURL) => {
          if (typeof currentUser.avatar !== "undefined") {
            deleteOldAvatar(currentUser.avatar);
          }
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      dispatch(startUpdateUser());

      // Include only the data you need in the body
      const bodyData = {
        password: formData.password,
        avatar: formData.avatar,
        userName: formData.username,
      };
      const res = await fetch(`/api/v1/user/updateUser/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
      const data = await res.json();

      if (!data.isValid) {
        dispatch(updateUserError(data.message));
        return false;
      }
      dispatch(updateUserSucc(data));
    } catch (error) {
      dispatch(updateUserError(error.message));
      console.log(error.message);
    }
  };

  const deleteCurrentUser = async () => {
    try {
      const res = await fetch(`/api/v1/user/deleteUser/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      dispatch(deleteUserStart());
      if (!data.isValid) {
        dispatch(deleteuserFailed(data.message));
        return false;
      }

      dispatch(deleteUserSuccessFull(''));
      localStorage.clear();
      navigate("/signin");
    } catch (error) {
      dispatch(deleteuserFailed(error.message));
    }
  };

  const signOutuser = async () => {
    try {
      const res = await fetch(`/api/v1/auth/signOut`);

      const data = await res.json();
      dispatch(signInStart());
      if (!data.isValid) {
        dispatch(signOutUserFailed());
        return false;
      }

      localStorage.clear();
      dispatch(deleteUserSuccessFull(''));
      navigate("/signin");

    } catch (error) {
      console.log(error);
    }
  };

  const deleteOldAvatar = (imagePath) => {
    const storage = getStorage(app);
    const imageRef = ref(storage, extractStoragePath(imagePath));

    deleteObject(imageRef)
      .then(() => {
        console.log("Image deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  function extractStoragePath(firebaseUrl) {
    try {
      // Find the part after "/o/" which is the storage path, then decode it
      const pathStart = firebaseUrl.indexOf("/o/") + 3; // 3 is for length of "/o/"
      const pathEnd = firebaseUrl.indexOf("?");
      const encodedPath = firebaseUrl.slice(pathStart, pathEnd);

      // Decode URL-encoded characters (e.g., %2F -> /)
      const storagePath = decodeURIComponent(encodedPath);

      return storagePath;
    } catch (error) {
      console.error("Invalid Firebase Storage URL:", error);
      return null;
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto shadow-gray-400 shadow-2xl align-middle h-full mt-5">
      <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={submitForm}>
        <input
          type="file"
          name=""
          id=""
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          accept="image/*"
        />
        <img
          src={formData.avatar || currentUser.avatar}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
          alt=""
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {FileUploadError ? (
            <span className="text-red-700">
              Error Image Upload (image must be less then 2mb)
            </span>
          ) : isFileUploading > 0 && isFileUploading < 100 ? (
            <span>{`Uploading ${isFileUploading}%`}</span>
          ) : isFileUploading === 100 ? (
            <span className="text-green-700">Successfully Uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.userName}
          onChange={handleChange}
          className="border p-3 rounded-lg "
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border p-3 rounded-lg bg-gray-200"
          disabled
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          className="border p-3 rounded-lg"
          id="password"
        />
        <button
          type="submit"
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-80  "
        >
          Update Profile
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <span
          className="text-red-700 cursor-pointer font-semibold"
          onClick={deleteCurrentUser}
        >
          Delete Account
        </span>
        <span
          className="text-red-700 cursor-pointer font-semibold"
          onClick={signOutuser}
        >
          Sign Out
        </span>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          type="button"
          className="flex-1 bg-orange-700 text-white rounded-lg p-2 uppercase hover:opacity-80"
          onClick={() => navigate(`/userListing`)}
        >
          View Listing
        </button>
        <button
          type="button"
          className="flex-1 bg-green-700 text-white rounded-lg p-2 uppercase hover:opacity-80"
          onClick={() => navigate(`/listing`)}
        >
          Create Listing
        </button>
      </div>
    </div>
  );
};

export default Profile;
