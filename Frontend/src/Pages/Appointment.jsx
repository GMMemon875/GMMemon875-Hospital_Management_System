import React from "react";
import AppointmentForm from "../componants/AppointmentForm";
import Hero from "../componants/Hero";

const Appointment = () => {
  return (
    <>
      <Hero title={"GMCear Hospital "} imageUrl={"./signin.png"} />

      <AppointmentForm />
    </>
  );
};

export default Appointment;
