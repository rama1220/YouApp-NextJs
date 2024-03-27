"use client";
import { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const endpoint = "https://techtest.youapp.ai/api";

  const Register = async (email1, username1, password1) => {
    try {
      const response = await axios.post(`${endpoint}/register`, {
        email: email1,
        username: username1,
        password: password1,
      });
      const { email, username } = JSON.parse(response.config.data);
      localStorage.setItem("email", email);
      localStorage.setItem("username", username);
      window.location.href = "/login";
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const Login = async (email1, username1, password1) => {
    try {
      const response = await axios.post(`${endpoint}/login`, {
        email: email1,
        username: username1,
        password: password1,
      });
      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
      console.log(response);
      window.location.href = '/profile';
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
const CreateProfile = async (profileData) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(`${endpoint}/createProfile`, profileData, {
      headers: {
        'x-access-token': accessToken,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const Born = (date) => {
  if (!date || typeof date !== 'string' || !date.includes("-")) {
    return "Invalid date format";
  }

  const parts = date.split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  return `${day}-${month}-${year}`;
};

const Age = (birthday) => {
  if (!birthday || typeof birthday !== 'string' || !birthday.includes("-")) {
    return "Invalid birthday format";
  }

  const birth = birthday.split("-");
  const yearOfBirth = parseInt(birth[0]);

  const timestamp = Date.now();
  const dateNow = new Date(timestamp);
  const yearNow = dateNow.getFullYear();

  return yearNow - yearOfBirth;
};

  const values = {
    Register,
    Login,
    CreateProfile,
    Born,
    Age
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
