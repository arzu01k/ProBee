import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../logoprobee.png';
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  let isLogin = localStorage.getItem("username") 
  ? (
      <Link 
        to="/MyProjects" 
        className="nav-item"
      >
        {localStorage.getItem("role") === "Instructor" ? "All Projects" : "My Projects"}
      </Link>
    ) 
  : ""; 
  let isInstructor = (localStorage.getItem("role") == "Instructor")? <Link to="/NewProject" className="nav-item active">New Project</Link>:"";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar-container">
      <div className="logo-container" onClick={() => navigate("/")}>
        <img src={logo} alt="PROBee Logo" className="logo-image" />
      </div>
      <nav className="nav-menu">
        { isInstructor }
        { isLogin }
      </nav>
      <div className="logout-button-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;