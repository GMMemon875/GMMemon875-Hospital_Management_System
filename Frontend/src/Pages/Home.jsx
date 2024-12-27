import React from "react";
import Hero from "../componants/Hero";
import Biography from "../componants/Biography";
import Department from "../componants/Department";
import MessageFrom from "../componants/MessageForm";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "well come to GM Madical institute | your Trested healthCare Provider "
        }
        imageUrl={"./hero.png"}
      />
      <Biography />
      <Department />
      <MessageFrom />
    </>
  );
};

export default Home;
