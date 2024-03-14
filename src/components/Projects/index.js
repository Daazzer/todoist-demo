import { createElement, useState } from 'react';
import classNames from 'classnames';
import { BsChevronRight } from 'react-icons/bs';
import { BsChevronDown } from 'react-icons/bs';
import { BsPlus } from 'react-icons/bs';
import ProjectForm from '@/components/ProjectForm';
import './index.scss';

export default function Projects() {
  const [isOpen, setIsOpen] = useState(true);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);

  return (
    <div className="projects">
      <div
        className={classNames('projects-trigger', { open: isOpen })}
        onClick={() => setIsOpen(!isOpen)}
      >
        {createElement(
          isOpen
            ? BsChevronDown
            : BsChevronRight,
          { className: 'projects-trigger__icon' }
        )}Projects
      </div>
      {isOpen && <ul className="projects-list">
        <li className="projects-list__item">
          <i className="color-tag" />
          <span className="emoji">🙌</span>
          <span className="title">THE OFFICE</span>
        </li>
        <li className="projects-list__item">
          <i className="color-tag" />
          <span className="emoji">🙌</span>
          <span className="title">THE OFFICE</span>
        </li>
      </ul>}
      <div className="projects-add-btn" onClick={() => setIsProjectFormOpen(true)}>
        <BsPlus className="projects-add-btn__icon" />Add Project
      </div>
      <ProjectForm isShow={isProjectFormOpen} onClose={() => setIsProjectFormOpen(false)} />
    </div>
  );
}