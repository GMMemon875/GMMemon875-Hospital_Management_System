import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const Doctors = () => {
  const [Doctors, setDoctors] = useState([]); // doctors data ko store karni ke lei
  const { isAuthenticated } = useContext(Context); // athantication ke lei

  useEffect(() => {
    const fatchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/user/doctors`,
          {
            withCredentials: true,
          }
        );
        console.log(data.doctors);
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fatchData();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="page doctors">
        <h1>DOCTORS</h1>
        <div className="banner">
          {Doctors && Doctors.length > 0
            ? Doctors.map((element) => {
                return (
                  <div className="card">
                    <img
                      src={element.docAvatar && element.docAvatar.url}
                      alt="Doctor Avatar"
                    />
                    <h4>{`${element.firstName},${element.lastName}`}</h4>
                    <div className="datails">
                      <p>
                        email:<span>{element.email}</span>
                      </p>
                      <p>
                        Gender:<span>{element.gender}</span>
                      </p>
                      <p>
                        DOB:<span>{element.dob.substring(0, 10)}</span>
                      </p>
                      <p>
                        NIC:<span>{element.nic}</span>
                      </p>
                      <p>
                        phone:<span>{element.phone}</span>
                      </p>
                      <p>
                        Department:<span>{element.doctorDepartment}</span>
                      </p>

                      <p>
                        Role:<span>{element.role}</span>
                      </p>
                    </div>
                  </div>
                );
              })
            : "Doctor is Not Register"}
        </div>
      </section>
    </>
  );
};

export default Doctors;
