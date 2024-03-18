import { createElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { BsCircle, BsCheckCircleFill, BsPlus } from 'react-icons/bs';
import { selectProjects } from '@/store/reducers/projectsSlice';
import { selectTodoList, todoListAddAction, todoListToggleAction } from '@/store/reducers/todoListSlice';
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
  const todoList = useSelector(selectTodoList).filter(todoListItem => todoListItem.projectId === project.id);
  const [text, setText] = useState('');
  const [isTodoFormOpen, setIsTodoFormOpen] = useState(false);
  const dispatch = useDispatch();
  let todoFormTextarea = null;

  const onAddTaskClick = () => {
    setIsTodoFormOpen(true);
    setText('');
  };

  useEffect(() => {
    if (isTodoFormOpen) {
      todoFormTextarea.focus();
    }
  }, [isTodoFormOpen, todoFormTextarea]);

  const onSubmitClick = () => {
    dispatch(todoListAddAction({
      text,
      projectId: project.id
    }));
    onCancelClick();
  };

  const onCancelClick = () => setIsTodoFormOpen(false);

  return (
    <div className="project">
      <h2 className="project__title">
        <span className="emoji">{emojisMap[project.emoji]}</span>
        {project.title}
      </h2>
      <ul className="project__todo-list">
        {todoList.map(todoListItem =>
          <li
            key={todoListItem.id}
            className="project__todo-list__item"
            onClick={() => dispatch(todoListToggleAction({
              ...todoListItem,
              isDone: !todoListItem.isDone
            }))}
          >
            {createElement(todoListItem.isDone ? BsCheckCircleFill : BsCircle, { className: classNames('checkbox', { checked: todoListItem.isDone }) })}
            <p className="content">{todoListItem.text}</p>
          </li>
        )}
      </ul>
      <button className="project__add-task-btn" onClick={onAddTaskClick}>
        <BsPlus className="project__add-task-btn__icon" />Add Task
      </button>
      {isTodoFormOpen && <div className="todo-form-wrapper">
        <form className="todo-form">
          <h2 className="todo-form__title">Add Todo</h2>
          <div className="todo-form__field">
            <textarea
              className="todo-form__textarea"
              value={text}
              onInput={e => setText(e.target.value)}
              rows={6}
              ref={node => todoFormTextarea = node}
            />
          </div>
          <footer className="todo-form__footer">
            <button
              className="todo-form__button todo-form__button--submit"
              type="button"
              onClick={onSubmitClick}
            >Submit</button>
            <button
              className="todo-form__button todo-form__button--cancel"
              type="button"
              onClick={onCancelClick}
            >Cancel</button>
          </footer>
        </form>
      </div>}
    </div>
  );
}
