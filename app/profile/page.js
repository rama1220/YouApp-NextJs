"use client";
import Main from "../Component/Main";
import Box from "../Component/Box";
import BoxbAbout from "../Component/BoxAbout";
import BoxInterest from "../Component/BoxInterest";

export default function Profile() {


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
