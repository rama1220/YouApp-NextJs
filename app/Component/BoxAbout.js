import React, { useState, useEffect } from "react";
import { useAuth } from "../useContext";
import { useRouter } from "next/navigation";
import Back from "../Component/Back";

export default function BoxAbout({ title, paragraph }) {
  const [username, setUsername] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    gender: "",
    birthday: "",
    horoscope: "",
    zodiac: "",
    height: "",
    weight: "",
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const { CreateProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageSrc(imageUrl);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditBio = () => {
    setBio(false);
  };

  const handleSave = async () => {
    const interests = localStorage.getItem("interests");
    try {
      if (imageSrc) {
        setUploadedImageUrl(imageSrc);
        localStorage.setItem("image", imageSrc);
      }
      setBio(true);
      const height = parseFloat(formData.height);
      const weight = parseFloat(formData.weight);

      await CreateProfile({
        name: formData.displayName,
        birthday: formData.birthday,
        height: height,
        weight: weight,
        interests: interests,
      });

      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 justify-between w-full">
        <Back link="" />
        <h2 className="username text-white  -ml-5">@{username}</h2>
        <div className="dot-side">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-three-dots" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
          </svg>
        </div>
      </div>
      <div className="content-container">
        <div className="Box-profile mt-10 relative">
          {uploadedImageUrl && <img src={uploadedImageUrl} alt="Profile" className="w-full h-full object-cover rounded-lg" />}
          <div className="content text-white absolute bottom-0">@{username}</div>
        </div>
      </div>
      <div className="content-container">
        {editMode ? (
          <div className={`Box-biodata-edit relative`}>
            <div className="content text-black absolute">
              {bio ? (
                <div className="tag-about flex justify-between items-center text-white">
                  <h2>{title}</h2>
                  <div className="cursor-pointer icon-edit" onClick={handleEditBio}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 00 .196l6.813-6.814z" />
                      <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="tag-about flex justify-between items-center text-white">
                  <h2>{title}</h2>
                  <div className="cursor-pointer" onClick={handleSave}>
                    <h2 className="text-orange-300">Save & Update</h2>
                  </div>
                </div>
              )}

              <div className="image-side mt-7 flex items-center">
                <label htmlFor="uploadImage" className="image-profile bg-gray-500 mr-5 flex justify-center items-center rounded-lg">
                  {imageSrc ? (
                    <img src={imageSrc} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" class="bi bi-plus-lg" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                    </svg>
                  )}
                  <input type="file" id="uploadImage" className="hidden" onChange={handleImageChange} />
                </label>
                <h2 className="text-white text-lg">Add image</h2>
              </div>
              {bio ? (
                <div className="biodata mt-10 flex flex-col gap-3">
                  <div className="flex justify-between">
                    <label htmlFor="displayName" className="text-white">
                      Display Name
                    </label>
                    <h2 className="text-white">{formData.displayName}</h2>
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="gender" className="text-white">
                      Gender
                    </label>
                    <h2 className="text-white">{formData.gender}</h2>
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="birthday" className="text-white">
                      Birthday
                    </label>
                    <h2 className="text-white">{formData.birthday}</h2>
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="horoscope" className="text-white">
                      Horoscope
                    </label>
                    <h2 className="text-white">{formData.horoscope}</h2>
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="zodiac" className="text-white">
                      Zodiac
                    </label>
                    <h2 className="text-white">{formData.zodiac}</h2>
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="height" className="text-white">
                      Height
                    </label>
                    <h2 className="text-white">{formData.height}</h2>
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="weight" className="text-white">
                      Weight
                    </label>
                    <h2 className="text-white">{formData.weight}</h2>
                  </div>
                </div>
              ) : (
                <form className="mt-5 flex flex-col gap-3">
                  <div className="flex justify-between">
                    <label htmlFor="displayName" className="text-white">
                      Display Name
                    </label>
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      className="form-input h-10 p-2 focus:outline-none"
                      placeholder="Enter display name"
                      style={{ borderRadius: "5px", backgroundColor: "rgba(169, 169, 169, 0.5)", color: "rgba(255, 255, 255, 0.7)" }}
                      onChange={handleInputChange}
                      value={formData.displayName}
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="gender" className="text-white">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      className="form-input h-10 p-2 focus:outline-none"
                      style={{ borderRadius: "5px", backgroundColor: "rgba(169, 169, 169, 0.5)", color: "rgba(255, 255, 255, 0.7)" }}
                      onChange={handleInputChange}
                      value={formData.gender}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="birthday" className="text-white">
                      Birthday
                    </label>
                    <input
                      type="date"
                      id="birthday"
                      name="birthday"
                      className="form-input h-10 p-2 focus:outline-none"
                      style={{ borderRadius: "5px", backgroundColor: "rgba(169, 169, 169, 0.5)", color: "rgba(255, 255, 255, 0.7)" }}
                      onChange={handleInputChange}
                      value={formData.birthday}
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="horoscope" className="text-white">
                      Horoscope
                    </label>
                    <input
                      type="text"
                      id="horoscope"
                      name="horoscope"
                      className="form-input h-10 p-2 focus:outline-none"
                      placeholder="---"
                      style={{ borderRadius: "5px", backgroundColor: "rgba(169, 169, 169, 0.5)", color: "rgba(255, 255, 255, 0.7)" }}
                      onChange={handleInputChange}
                      value={formData.horoscope}
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="zodiac" className="text-white">
                      Zodiac
                    </label>
                    <input
                      type="text"
                      id="zodiac"
                      name="zodiac"
                      className="form-input h-10 p-2 focus:outline-none"
                      placeholder="---"
                      style={{ borderRadius: "5px", backgroundColor: "rgba(169, 169, 169, 0.5)", color: "rgba(255, 255, 255, 0.7)" }}
                      onChange={handleInputChange}
                      value={formData.zodiac}
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="height" className="text-white">
                      Height
                    </label>
                    <input
                      type="number"
                      id="height"
                      name="height"
                      className="form-input h-10 p-2 focus:outline-none"
                      placeholder="Add height"
                      style={{ borderRadius: "5px", backgroundColor: "rgba(169, 169, 169, 0.5)", color: "rgba(255, 255, 255, 0.7)" }}
                      onChange={handleInputChange}
                      value={formData.height}
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="weight" className="text-white">
                      Weight
                    </label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      className="form-input h-10 p-2 focus:outline-none"
                      placeholder="Add weight"
                      style={{ borderRadius: "5px", backgroundColor: "rgba(169, 169, 169, 0.5)", color: "rgba(255, 255, 255, 0.7)" }}
                      onChange={handleInputChange}
                      value={formData.weight}
                    />
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div className={`Box-biodata relative`}>
            <div className="content text-black absolute">
              <div className="tag-about flex justify-between items-center text-white">
                <h2>{title}</h2>
                <div className="cursor-pointer icon-edit" onClick={handleEdit}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 00 .196l6.813-6.814z" />
                    <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-white opacity-50 mt-8">{paragraph}</h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
