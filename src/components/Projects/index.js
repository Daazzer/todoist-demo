import { createElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { BsChevronRight } from 'react-icons/bs';
import { BsChevronDown } from 'react-icons/bs';
import { BsPlus } from 'react-icons/bs';
import ProjectForm from '@/components/ProjectForm';
import { selectCurrentActive } from '@/store/reducers/currentActiveSlice';
import { projectsAddAction } from '@/store/reducers/projectsSlice';
import './index.scss';

const emojisMap = {
  handsUp: '🙌',
  rocket: '🚀',
  target: '🎯',
  books: '📚',
  music: '🎵'
};

export default function Projects({ items = [] }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const currentActive = useSelector(selectCurrentActive);
  const dispatch = useDispatch();

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
        {items.map(item =>
          <li key={item.id} className="projects-list__item">
            <i className="color-tag" style={{ backgroundColor: item.color }} />
            <span className="emoji">{emojisMap[item.emoji]}</span>
            <span className="title">{item.title}</span>
          </li>
        )}
      </ul>}
      <div className="projects-add-btn" onClick={() => setIsProjectFormOpen(true)}>
        <BsPlus className="projects-add-btn__icon" />Add Project
      </div>
      <ProjectForm
        type={currentActive}
        isShow={isProjectFormOpen}
        onClose={() => setIsProjectFormOpen(false)}
        onConfirm={project => dispatch(projectsAddAction(project))}
      />
    </div>
  );
}