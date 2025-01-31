import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProjectDetail.css";
import Sidebar from "./Sidebar";

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [error, setError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError("Failed to load project details. Please try again.");
      }
    };

    fetchProjectDetails();
  }, [id]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleFileRemove = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ display: "flex", flexGrow: 1 }}>
      <Sidebar />
      <div className="detail-wrapper">
        <div className="detail-container">
          <h1 className="detail-header">Project Detail</h1>

          <div className="project-info">
            <div className="project-name-wrapper">
              <label htmlFor="project-name" className="project-name-label">
                Project Name
              </label>
              <input
                type="text"
                id="project-name"
                value={project.name}
                readOnly
                className="project-name-input"
              />
            </div>

            <div className="project-description-wrapper">
              <label htmlFor="project-description" className="project-description-label">
                Project Description
              </label>
              <textarea
                id="project-description"
                value={project.description}
                readOnly
                className="project-description-input"
              />
            </div>

            <div className="lists-container">
              <div className="student-list">
                <h3>Student List</h3>
                {project.students && project.students.length > 0 ? (
                  <ul>
                    {project.students.map((student, index) => (
                      <li key={index}>{student}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No students assigned to this project.</p>
                )}
              </div>
              <div className="file-list">
                <h3>File List</h3>
                <label className="custom-file-button">
                  Add File
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden-file-input"
                  />
                </label>
                <ul className="file-names-list">
                  {uploadedFiles.map((file, index) => (
                    <li key={index}>
                      {file.name}
                      <button
                        onClick={() => handleFileRemove(index)}
                        className="file-remove-button"
                      >
                        ✖
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;