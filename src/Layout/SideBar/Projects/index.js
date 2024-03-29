import { createElement, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { ColorPicker, Form, Input, Modal, Select } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { BsChevronRight, BsChevronDown, BsPlus, BsX } from 'react-icons/bs';
import { selectCurrentActiveMenu } from '@/store/reducers/currentActiveMenuSlice';
import { projectsAddAction, projectsDelAction, selectProjects } from '@/store/reducers/projectsSlice';
import NoData from '@/components/NoData';
import EmojiPicker from 'emoji-picker-react';
import './index.scss';

export default function Projects({ label, items = [] }) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const store = useStore();
  const [form] = Form.useForm();
  const currentActiveMenu = useSelector(selectCurrentActiveMenu);
  const dispatch = useDispatch();
  const history = useHistory();

  const onProjectsDelClick = (e, item) => {
    e.preventDefault();
    Modal.confirm({
      title: `是否删除项目“${item.title}”？`,
      icon: <ExclamationCircleFilled />,
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        dispatch(projectsDelAction(item.id));
        const projects = selectProjects(store.getState());
        const items = projects.filter(project => project.menuPath === item.menuPath);
        const menuPath = pathname.slice(1).split('/')[0];
        if (menuPath !== item.menuPath) {
          return;
        } else if (items.length) {
          const lastItem = items[items.length - 1];
          history.push(`/${lastItem.menuPath}/${lastItem.id}`);
        } else {
          history.push('/');
        }
      },
      maskClosable: true
    });
  };

  const onProjectAdd = () => {
    form.resetFields();
    setIsProjectFormOpen(true);
  };

  const onProjectOk = async () => {
    try {
      await form.validateFields();
    } catch {
      return;
    }

    const data = form.getFieldsValue();
    const project = {
      ...data,
      menuPath: currentActiveMenu,
      color: typeof data.color === 'string' ? data.color : data.color.toHexString()
    };

    dispatch(projectsAddAction(project));

    setIsProjectFormOpen(false);
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
              <span className="emoji">{item.emoji}</span>
              <span className="title">{item.title}</span>
              <BsX className="del-btn" onClick={e => onProjectsDelClick(e, item)} />
            </NavLink>
          </li>
        ) : <NoData className="projects-list__no-data" text="No Project" />}
      </ul>}
      <button className="projects-add-btn" onClick={onProjectAdd}>
        <BsPlus className="projects-add-btn__icon" />Add Project
      </button>
      <Modal
        open={isProjectFormOpen}
        title={`Add Project For "${label}"`}
        onCancel={() => setIsProjectFormOpen(false)}
        onOk={onProjectOk}
        maskClosable={false}
      >
        <Form form={form} labelCol={{ span: 4 }} labelAlign="left">
          <Form.Item
            label="Color"
            name="color"
            initialValue="#000000"
          >
            <ColorPicker />
          </Form.Item>
          <Form.Item
            label="Emoji"
            name="emoji"
            initialValue=""
            rules={[{ required: true }]}
          >
            <Select
              open={isSelectOpen}
              onDropdownVisibleChange={visible => setIsSelectOpen(visible)}
              dropdownRender={() => (
                <EmojiPicker
                  emojiStyle="native"
                  width={380}
                  onEmojiClick={(emojiData, e) => {
                    e.stopPropagation();
                    form.setFieldValue('emoji', emojiData.emoji);
                    setIsSelectOpen(false);
                  }}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            initialValue=""
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}