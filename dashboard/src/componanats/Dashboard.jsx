import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom";
const Dashboard = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [appointment, setAppointment] = useState([]);
  useEffect(() => {
    const fatchAppointment = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        // console.log(data.appointments);
        console.log(user.firstName);
        setAppointment(data.appointments);
      } catch (error) {
        setAppointment({});
        console.log("Appointment is not Registered", error);
      }
    };
    fatchAppointment();
  }, []);

  const [Doctors, setDoctors] = useState([]); // doctors data ko store karni ke lei

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
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="DocImg" />
            <div className="contant">
              <div>
                <p>Hello ,</p>
                <h5>{user && `${user.firstName},${user.lastName}`}</h5>
              </div>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident delectus fuga illo doloremque enim, et totam in quo
                fugit eaque
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Appointment</p>
            <h4>{appointment.length}</h4>
          </div>

          <div className="thirdBox">
            <p>Registers Doctors</p>
            <h4>{Doctors.length}</h4>
          </div>
        </div>
        <div className="banner">
          <h5>Appointment</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Department</th>
                <th>Doctor</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointment && appointment.length > 0 ? (
                appointment.map((appointment) => {
                  return (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>{`${appointment.appointment_date.substring(
                        0,
                        16
                      )}`}</td>
                      <td> {`${appointment.department}`} </td>
                      <td>{`${appointment.doctor.firstName}   ${appointment.doctor.lastName}`}</td>
                      <td>
                        <select
                          className={
                            appointment.status === "pending"
                              ? "value-pending"
                              : appointment.status === "rejected"
                              ? "value-rejected"
                              : "value-accepted"
                          }
                          value={appointment.status}
                          onChange={() => {}}
                        >
                          <option value="pending" className="value-pending">
                            Pending
                          </option>
                          <option value="rejected" className="value-rejected">
                            Recjected
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h1>No Appointment</h1>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
