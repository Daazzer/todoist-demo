import { createElement, useState } from 'react';
import classNames from 'classnames';
import { BsChevronRight } from 'react-icons/bs';
import { BsChevronDown } from 'react-icons/bs';
import { BsPlus } from 'react-icons/bs';
import './index.scss';

/** @type {Array<{ value: string; label: string }>} */
const emojis = [
  {
    value: 'hands up',
    label: '🙌'
  },
  {
    value: 'rocket',
    label: '🚀'
  },
  {
    value: 'target',
    label: '🎯'
  },
  {
    value: 'books',
    label: '📚'
  },
  {
    value: 'music',
    label: '🎵'
  }
];

function ProjectForm({ onClose }) {
  return (
    <div className="project-form-wrapper">
      <form className="project-form">
        <h2 className="project-form__title">
          Add Project
          <button className="close-btn" type="button" onClick={onClose}>×</button>
        </h2>
        <div className="project-form__field">
          <label className="project-form__label" htmlFor="color">Color</label>
          <input
            className="project-form__content color"
            id="color"
            name="color"
            type="color"
          />
        </div>
        <div className="project-form__field">
          <label
            className="project-form__label"
            htmlFor="emoji"
          >Emoji</label>
          <select
            className="project-form__content emoji"
            id="emoji"
            name="emoji"
          >
            {emojis.map(emoji => <option key={emoji.value} {...emoji} />)}
          </select>
        </div>
        <div className="project-form__field">
          <label className="project-form__label" htmlFor="title">Title</label>
          <input
            maxLength={300}
            className="project-form__content"
            id="title"
            name="title"
          />
        </div>
      </form>
    </div>
  );
}

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
      {isProjectFormOpen && <ProjectForm onClose={() => setIsProjectFormOpen(false)} />}
    </div>
  );
}