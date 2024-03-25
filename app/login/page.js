"use client";
import Box from "../Component/Box";
import Main from "../Component/Main";
import { useState } from "react";
import { EyeOffIcon, EyeIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useAuth } from "../useContext";
import Back from "../Component/Back";

export default function Login() {
  const { Login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    const handleLogin = async () => {
      try {
        const email = localStorage.getItem("email");
        await Login(email, username, password);
      } catch (error) {
        console.log(error);
      }
    };


  return (
    <>
      <Main>
        <Box>
         <Back link=""/>
          <div className="container-login mx-auto mt-10 rounded-lg w-80">
            <div className="login-title">
              <h1 className="pt-4 pb-8 font-bold text-3xl text-white">Login</h1>
            </div>

            <form className = "flex flex-col gap-5 pr-4"onSubmit = {(e) => {e.preventDefault(); handleLogin();}}>
              <input type="text" name="username" className="p-3 rounded-lg bg-gray-700 bg-opacity-50 text-white focus:outline-none" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
              <div className="relative flex items-center bg-gray-700 bg-opacity-50 rounded-lg">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 w-full text-white bg-transparent focus:outline-none"
                  placeholder="Enter Password"
                />
                {showPassword ? <EyeIcon className="h-6 w-6 text-white mr-3 cursor-pointer opacity-50" onClick={togglePasswordVisibility} /> : <EyeOffIcon className="h-6 w-6 text-white mr-3 cursor-pointer opacity-50" onClick={togglePasswordVisibility} />}
              </div>
              <button className="bg-gradient-to-r from-teal-500 via-blue-500 to-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-outline" type="submit">Login</button>
            </form>
            <h4 className="text-white text-center mt-10">
              No account?{" "}
              <Link href="/register">
                <span className="underline text-orange-300">Register here</span>
              </Link>
            </h4>
          </div>
        </Box>
      </Main>
    </>
  );
}
