import React from "react";
import "./NewProjects.css";
import { FaEye, FaGlassCheers, FaWindowMaximize } from "react-icons/fa";

const NewProjects = ({projects}) => {;

  return (
    <section className="new-projects">
      <div className="m-container">
        <h2 className="section-titled">Sprawdź nasze nowe projekty</h2>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <button className="project-btn"><FaEye style={{marginRight: 10, paddingTop: 3}}/> Zobacz realizację</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProjects;