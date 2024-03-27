import { createElement, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { BsChevronRight, BsChevronDown, BsPlus, BsX } from 'react-icons/bs';
import ProjectForm from '@/components/ProjectForm';
import { selectCurrentActiveMenu } from '@/store/reducers/currentActiveMenuSlice';
import { projectsAddAction, projectsDelAction, selectProjects } from '@/store/reducers/projectsSlice';
import NoData from '@/components/NoData';
import './index.scss';

const emojisMap = {
  handsUp: '🙌',
  rocket: '🚀',
  target: '🎯',
  books: '📚',
  music: '🎵'
};

export default function Projects({ label, items = [] }) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const store = useStore();
  const currentActiveMenu = useSelector(selectCurrentActiveMenu);
  const dispatch = useDispatch();
  const history = useHistory();

  const onProjectsDelClick = (e, item) => {
    e.preventDefault();
    dispatch(projectsDelAction(item.id));
    const projects = selectProjects(store.getState());
    const items = projects.filter(project => project.type === item.type);
    const type = pathname.slice(1).split('/')[0];
    if (type !== item.type) {
      return;
    } else if (items.length) {
      const lastItem = items[items.length - 1];
      history.push(`/${lastItem.type}/${lastItem.id}`);
    } else {
      history.push('/');
    }
  };

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
        {items.length ? items.map(item =>
          <li
            key={item.id}
            className="projects-list__item"
          >
            <NavLink
              className="projects-list__item-nav-link"
              to={`/${item.menuPath}/${item.id}`}
            >
              <i className="color-tag" style={{ backgroundColor: item.color }} />
              <span className="emoji">{emojisMap[item.emoji]}</span>
              <span className="title">{item.title}</span>
              <BsX className="del-btn" onClick={e => onProjectsDelClick(e, item)} />
            </NavLink>
          </li>
        ) : <NoData className="projects-list__no-data" text="No Project" />}
      </ul>}
      <div className="projects-add-btn" onClick={() => setIsProjectFormOpen(true)}>
        <BsPlus className="projects-add-btn__icon" />Add Project
      </div>
      <ProjectForm
        label={label}
        type={currentActiveMenu}
        isShow={isProjectFormOpen}
        onClose={() => setIsProjectFormOpen(false)}
        onConfirm={project => dispatch(projectsAddAction(project))}
      />
    </div>
  );
}