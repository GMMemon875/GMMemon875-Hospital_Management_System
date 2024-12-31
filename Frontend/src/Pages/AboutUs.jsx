import React from "react";
import Hero from "../componants/Hero";
import Biography from "../componants/Biography";
const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | GM.Care Medical Institute"}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
    </>
  );
};

export default AboutUs;
