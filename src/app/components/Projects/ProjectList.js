'use client';
import React, { useState, useEffect } from 'react';
import projects from '../../data/projects';
import ProjectDetails from './ProjectDetails';

const ProjectList = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isScaled, setIsScaled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScaled(true);
      clearTimeout(window.scaleTimeout);
      window.scaleTimeout = setTimeout(() => setIsScaled(false), 600); 
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(window.scaleTimeout);
    };
  }, []);

  const handleProjectClick = (id) => {
    setSelectedProjectId(id === selectedProjectId ? null : id);
  };

  return (
    <div className={`project-list ${isScaled ? 'scaled' : ''}`}>
      {projects.map(project => (
        <div
          key={project.id}
          className={`project-item ${selectedProjectId === project.id ? 'selected' : ''}`}
        >
          <div className="main-image" onClick={() => handleProjectClick(project.id)}>
            <img src={project.image} alt={project.name} />
          </div>
          {selectedProjectId === project.id && (
            <div className="project-details-wrapper">
              <ProjectDetails project={project} />
            </div>
          )}
          <div className="side-details">
            <div className="project-icon">
              <img src={project.icon} alt={`${project.name} icon`} />
            </div>
            <div className="project-info">
              <h3>{project.name}</h3>
              <p>{project.location}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;

