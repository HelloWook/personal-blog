import React from 'react';
import { projects } from '@/data/project';
import ProjectCard from '../ProjectCard/ProjectCard';

const ProjectList = () => {
  return (
    <div className='grid justify-between grid-cols-1 gap-4 sm:grid-cols-2'>
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  );
};

export default ProjectList;
