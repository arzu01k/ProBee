import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "./CreateNewProject.css";
import Sidebar from "./Sidebar";

function CreateNewProject() {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users/students");
        const studentOptions = response.data.map((student) => ({
          value: student.username,
          label: student.username,
        }));
        setStudents(studentOptions);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleCreate = async () => {
    const projectData = {
      name: document.querySelector("input[placeholder='Project Name']").value,
      description: document.querySelector("textarea[placeholder='Description']").value,
      students: selectedStudents.map((student) => student.value)
    };

    try {
      const response = await axios.post("http://localhost:8000/projects/create", projectData);
      console.log("Project created:", response.data);

      alert("Project created successfully!");
      navigate("/MyProjects");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project.");
    }
  };

  return (
    <div style= {{display: "flex", flexGrow: 1}}>
      <Sidebar/>
      <div className="main-content">
        <h1>New Project</h1>
        <div className="form-container">
          <div className="input-wrapper">
            <span className="icon">📋</span>
            <input type="text" placeholder="Project Name" />
          </div>
          <div className="input-wrapper">
            <span className="icon">📝</span>
            <textarea placeholder="Description"></textarea>
          </div>
          <div className="input-wrapper">
            <label htmlFor="student-select" className="icon">
              &nbsp;👥&nbsp;
              <span>Students</span>
            </label>
            <Select
              options={students}
              isMulti
              className="multi-select"
              placeholder="Select students..."
              onChange={(selectedOptions) => setSelectedStudents(selectedOptions)}
            />
          </div>
          <button className="create-button" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewProject;