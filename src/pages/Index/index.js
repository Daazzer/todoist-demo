import { createElement, useState } from 'react';
import classNames from 'classnames';
import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import { uuid } from '@/utils';
import './index.scss';

const todos = Array(8).fill().map(() => uuid());

export default function Index() {
  const [checkedTodos, setCheckedTodos] = useState(todos.slice(0, 3));

  return (
    <div className="index">
      <h1 className="index__title">Todoist Demo</h1>
      <ul className="todo">
        {todos.map(item => {
          const isChecked = checkedTodos.includes(item);
          return (
            <li key={item} className="todo__item">
              {createElement(isChecked ? BsCheckCircleFill : BsCircle, {
                className: classNames('todo__item__icon', { checked: isChecked }),
                onClick() {
                  let state = checkedTodos.concat(item);
                  if (isChecked) {
                    state = checkedTodos.filter(checkedTodo => checkedTodo !== item);
                  }
                  setCheckedTodos(state);
                }
              })}
              <div className={classNames('todo__item__content', { checked: isChecked })} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
