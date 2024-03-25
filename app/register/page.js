'use client';
import Box from "../Component/Box";
import Main from "../Component/Main";
import { useState } from "react";
import { EyeOffIcon, EyeIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useAuth } from "../useContext";
import Back from "../Component/Back";

export default function RegisterPage() {
    const { Register } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [passwordCreate, setPasswordCreate] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPasswordCreate, setShowCreatePassword] = useState(false);
  const [showPasswordConfirm, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState("");

  const toggleCreatePassword = () => {
    setShowCreatePassword(!showPasswordCreate);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showPasswordConfirm);
  };

  const handleRegister = async() => {
try{
    await Register(email, username, passwordCreate);
} catch(error){
    console.log(error);
    setAlert("Password must be same");
}
  };

  return (
    <>
      <Main>
        <Box>
         <Back link="login"/>
          <div div className = "container-login mx-auto mt-10  rounded-lg w-80" >
            <div className="login-title">
              <h1 className="pt-4 pb-8 font-bold text-3xl text-white">Register</h1>
            </div>

            <form className="flex flex-col gap-5 pr-4" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
              <input type="email" name="email" className="p-3 rounded-lg bg-gray-700 bg-opacity-50  text-white focus:outline-none" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="text" name="username" className="p-3 rounded-lg bg-gray-700 bg-opacity-50  text-white focus:outline-none" placeholder="Create Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <div className="relative flex items-center bg-gray-700 bg-opacity-50 rounded-lg">
                <input
                  type={showPasswordCreate ? "text" : "password"}
                  name="password"
                  value={passwordCreate}
                  onChange={(e) => setPasswordCreate(e.target.value)}
                  className="p-3 w-full text-white bg-transparent focus:outline-none"
                  placeholder="Create Password"
                />
                {showPasswordCreate ? (
                  <EyeIcon className="h-6 w-6 text-white opacity-50 mr-3 cursor-pointer" onClick={toggleCreatePassword} />
                ) : (
                  <EyeOffIcon className="h-6 w-6 text-white mr-3 cursor-pointer opacity-50" onClick={toggleCreatePassword} />
                )}
              </div>
              <div className="relative flex items-center bg-gray-700 bg-opacity-50 rounded-lg">
                {alert ? <p className="text-red-500">{alert}</p> : null}
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  name="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="p-3 w-full text-white bg-transparent focus:outline-none"
                  placeholder="Confirm Password"
                />
                {showPasswordConfirm ? (
                  <EyeIcon className="h-6 w-6 text-white mr-3 cursor-pointer opacity-50" onClick={toggleConfirmPassword} />
                ) : (
                  <EyeOffIcon className="h-6 w-6 text-white mr-3 cursor-pointer opacity-50" onClick={toggleConfirmPassword} />
                )}
              </div>
              <button className="bg-gradient-to-r from-teal-500 via-blue-500 to-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-outline" type="submit">Register</button>
            </form>
            <h4 className=" text-white text-center mt-10">
              Have an account?{" "}
              <Link href="/login">
                <span className="underline text-orange-300">Login here</span>
              </Link>
            </h4>
          </div>
        </Box>
      </Main>
    </>
  );
}
