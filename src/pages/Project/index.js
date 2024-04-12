import { createElement, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form, Input, Modal } from 'antd';
import { BsCircle, BsCheckCircleFill, BsPlus, BsX } from 'react-icons/bs';
import classNames from 'classnames';
import { selectProjects } from '@/store/reducers/projectsSlice';
import { selectTodoList, todoListAddAction, todoListDelAction, todoListToggleAction } from '@/store/reducers/todoListSlice';
import NoData from '@/components/NoData';
import './index.scss';

const { TextArea } = Input;

export default function Project() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const projects = useSelector(selectProjects);
  const project = projects.find(project => project.id === id);
  const todoList = useSelector(selectTodoList).filter(todoListItem => todoListItem.projectId === project.id);
  const [isTodoFormOpen, setIsTodoFormOpen] = useState(false);
  const dispatch = useDispatch();
  const textRef = useRef();

  const onAddTaskClick = () => {
    setIsTodoFormOpen(true);
    form.resetFields();
    setTimeout(() => textRef.current?.focus(), 1);
  };

  const onSubmitClick = async () => {
    try {
      await form.validateFields();
    } catch {
      return;
    }
    const text = form.getFieldValue('text');
    dispatch(todoListAddAction({
      text,
      projectId: project.id
    }));
    onCancelClick();
  };

  const onCancelClick = () => setIsTodoFormOpen(false);

  const onDelClick = (e, todoListItem) => {
    e.stopPropagation();
    dispatch(todoListDelAction(todoListItem.id));
  };

  return (
    <div className="project">
      <h2 className="project__title">
        <span className="emoji">{project.emoji}</span>
        {project.title}
      </h2>
      <ul className="project__todo-list">
        {todoList.length ? todoList.map(todoListItem =>
          <li
            key={todoListItem.id}
            className="project__todo-list__item"
            onClick={() => dispatch(todoListToggleAction({
              ...todoListItem,
              isDone: !todoListItem.isDone
            }))}
          >
            {createElement(
              todoListItem.isDone
                ? BsCheckCircleFill
                : BsCircle,
              { className: classNames('checkbox', { checked: todoListItem.isDone }) }
            )}
            <div className={classNames('content', { done: todoListItem.isDone })}>{todoListItem.text}</div>
            <BsX className="del-btn" onClick={e => onDelClick(e, todoListItem)} />
          </li>
        ) : <NoData className="project__todo-list__no-data" text="No Todo" />}
      </ul>
      <button className="project__add-task-btn" onClick={onAddTaskClick}>
        <BsPlus className="project__add-task-btn__icon" />Add Task
      </button>
      <Modal
        title="Add Todo"
        open={isTodoFormOpen}
        onOk={onSubmitClick}
        onCancel={onCancelClick}
      >
        <Form form={form}>
          <Form.Item
            name="text"
            initialValue=""
            rules={[{ required: true, message: '内容不能为空！' }]}
          >
            <TextArea
              ref={textRef}
              autoSize={{ minRows: 6, maxRows: 6 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
