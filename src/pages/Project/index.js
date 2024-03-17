import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BsCircle, BsCheckCircleFill, BsPlus } from 'react-icons/bs';
import { selectProjects } from '@/store/reducers/projectsSlice';
import './index.scss';

const emojisMap = {
  handsUp: '🙌',
  rocket: '🚀',
  target: '🎯',
  books: '📚',
  music: '🎵'
};

export default function Project() {
  const { id } = useParams();
  const projects = useSelector(selectProjects);
  const project = projects.find(project => project.id === id);

  return (
    <div className="project">
      <h2 className="project__title">
        <span className="emoji">{emojisMap[project.emoji]}</span>
        {project.title}
      </h2>
      <ul className="project__todo-list">
        <li className="project__todo-list__item">
          <BsCircle className="checkbox" />
          <p className="content">ddddddddddddddddddddddddddddddddddddddddsadsadasdsadasdsadsadsadsa</p>
        </li>
        <li className="project__todo-list__item">
          <BsCircle className="checkbox" />
          <p className="content">ddddddddddddddddddddddddddddddddddddddddsadsadasdsadasdsadsadsadsa</p>
        </li>
      </ul>
      <button className="project__add-task-btn">
        <BsPlus className="add-task-btn-icon" />Add Task
      </button>
    </div>
  );
}
