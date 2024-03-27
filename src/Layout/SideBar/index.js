import { createElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import classNames from 'classnames';
import * as BsIcons from 'react-icons/bs';
import { currentActiveMenuSetAction, selectCurrentActiveMenu } from '@/store/reducers/currentActiveMenuSlice';
import { selectProjects } from '@/store/reducers/projectsSlice';
import { menusDelAction, selectMenus } from '@/store/reducers/menusSlice';
import Projects from './Projects';
import './index.scss';

const { BsX } = BsIcons;

export default function SideBar() {
  const dispatch = useDispatch();
  const menus = useSelector(selectMenus);
  const currentActiveMenu = useSelector(selectCurrentActiveMenu);
  const projects = useSelector(selectProjects);

  const onMenuClick = path => {
    if (!currentActiveMenu || currentActiveMenu !== path) {
      dispatch(currentActiveMenuSetAction(path));
    }
  };

  const onMenuDel = (item, e) => {
    e.stopPropagation();
    Modal.confirm({
      title: `是否删除菜单“${item.label}”？`,
      icon: <ExclamationCircleFilled />,
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        console.log('OK');
        dispatch(menusDelAction(item.path));
      },
      maskClosable: true
    });
  };

  return (
    <aside className="side-bar">
      <ul className="menu-list">
        {menus.map(({ icon, label, path }) =>
          <li
            key={path}
            className="menu-list__item"
          >
            <div
              className={classNames(
                'menu-list__item__label',
                { active: currentActiveMenu === path }
              )}
              onClick={() => onMenuClick(path)}
            >
              {createElement(
                BsIcons[icon],
                { className: 'menu-list__item__icon' }
              )}{label}
              <BsX className="menu-list__item__del-btn" onClick={e => onMenuDel({ icon, label, path }, e)} />
            </div>
            {currentActiveMenu === path &&
              <Projects
                label={label}
                items={projects.filter(project => project.menuPath === path)}
              />}
          </li>
        )}
      </ul>
    </aside>
  );
}
