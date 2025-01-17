import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./componanats/Dashboard";
import Login from "./componanats/Login";
import Message from "./componanats/Message";
import Doctors from "./componanats/Doctors";
import AddnewAdmin from "./componanats/AddnewAdmin";
import AddnewDoctor from "./componanats/AddnewDoctor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./main";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  useEffect(() => {
    const fatchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/user/admin/me`,
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(true);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(false);
      }
    };
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/message" element={<Message />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/add" element={<AddnewAdmin />} />
        <Route path="/AddnewDoctor" element={<AddnewDoctor />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
