import React, { useContext, useState } from "react";
import { Context } from "../main";
import { TiHome } from "react-icon/ti";

const Sidebar = () => {
  const [show, setshow] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useContext(Context);
  return;

  <nav
    style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
    className={show ? "show sidebar" : "sidebar"}
  >
    <div className="links"></div>
  </nav>;
};

export default Sidebar;
