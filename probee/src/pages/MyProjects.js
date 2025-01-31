import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyProjects.css";
import Sidebar from "./Sidebar";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username")? localStorage.getItem("username"):"";
  const role = localStorage.getItem("role") || "";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (username && role) {
          const response = await axios.get(`http://localhost:8000/projects/byUsername/${username}/${role}`);
          setProjects(response.data);
        }
        else{
          window.location.href = `/`;
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [username]);

  const handleClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/projects/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  return (
    <div style= {{display: "flex", flexGrow: 1}}>
      <Sidebar/>
    <div className="main-content">
    <h1 className="projects-header">
          {role === "Instructor" ? "All Projects" : "My Projects"}
    </h1>
      <div className="project-table">
        <div className="project-header-row">
          <span className="project-header">ID</span>
          <span className="project-header">Project Name</span>
          <span className="project-header">Action</span>
        </div>

        {projects.map((project) => (
          <div className="project-item" key={project._id}>
            <span className="project-id">{project._id}</span>
            <span className="project-name">{project.name}</span>
            <Link to={`/ProjectDetail/${project._id}`} className="detail-button">Detail</Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default MyProjects;