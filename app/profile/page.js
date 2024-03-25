"use client";
import { useEffect, useState } from "react";
import Main from "../Component/Main";
import Box from "../Component/Box";
import BoxbAbout from "../Component/BoxAbout";
import BoxInterest from "../Component/BoxInterest";

export default function Profile() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <>
      <Main>
        <Box>
         <BoxbAbout title="About" paragraph="Add in your About to help others know you better"/>
         <BoxInterest title = "Interest" paragraph="Add in your interest to find a better match"/>
        </Box>
      </Main>
    </>
  );
}
