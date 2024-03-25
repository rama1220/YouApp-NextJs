'use client';
import React, { useState, useEffect } from "react";
import Main from "../Component/Main";
import Box from "../Component/Box";
import Back from "../Component/Back";

export default function Page() {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const savedInterests = JSON.parse(localStorage.getItem("interests"));
    if (savedInterests) {
      setInterests(savedInterests);
    }
  }, []);

  const handleInterest = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const newInterest = e.target.value.trim();
      setInterests([...interests, newInterest]);
      updateLocalStorage([...interests, newInterest]);
      e.target.value = ""; 
    }
  };

  const handleRemoveInterest = (index) => {
    const updatedInterests = [...interests];
    updatedInterests.splice(index, 1);
    setInterests(updatedInterests);
    updateLocalStorage(updatedInterests);
  };

  const handleSave = () => {
    const inputElement = document.getElementById("interestInput");
    const newInterest = inputElement.value.trim();
    if (newInterest !== "") {
      setInterests([...interests, newInterest]);
      updateLocalStorage([...interests, newInterest]);
      inputElement.value = "";
    }
  };

  const updateLocalStorage = (updatedInterests) => {
    localStorage.setItem("interests", JSON.stringify(updatedInterests));
  };

  return (
    <>
      <Main>
        <Box>
          <div className="flex items-center gap-3 justify-between w-full">
            <Back link="profile" />
            <h2 className="text-orange-300 text-2xl cursor-pointer" onClick={handleSave}>
              Save
            </h2>
          </div>
          <div className="box-interestMain">
            <div className="title-interest mt-20">
              <h2 className="text-orange-300 text-xl">Tell everyone about yourself</h2>
              <p className="text-white text-3xl font-bold mt-5">What interests you?</p>
            </div>
            <div className="box-interest mt-10 bg-gray-600 bg-opacity-50 rounded-md p-3">
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <div key={index} className="bg-gray-400 text-white flex justify-between items-center rounded-md px-3 py-1">
                    <span>{interest}</span>
                    <div className="delete cursor-pointer" onClick={() => handleRemoveInterest(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
              <input
                id="interestInput"
                type="text"
                className="bg-transparent w-full h-15 p-3 rounded-md focus:outline-none focus:text-white"
                onKeyDown={handleInterest}
              />
            </div>
          </div>
        </Box>
      </Main>
    </>
  );
}
