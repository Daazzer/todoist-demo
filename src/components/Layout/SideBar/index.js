import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { BsInboxFill } from 'react-icons/bs';
import { BsCalendar } from 'react-icons/bs';
import { BsCalendar3 } from 'react-icons/bs';
import { selectCurrentActive, currentActiveSetAction } from '@/store/reducers/currentActiveSlice';
import { selectProjects } from '@/store/reducers/projectsSlice';
import Projects from './Projects';
import './index.scss';

const sideBarItems = [
  {
    key: 'inbox',
    Icon: BsInboxFill,
    label: 'Inbox'
  },
  {
    key: 'today',
    Icon: BsCalendar,
    label: 'Today'
  },
  {
    key: 'next7days',
    Icon: BsCalendar3,
    label: 'Next7days'
  }
]

export default function SideBar() {
  const dispatch = useDispatch();
  const currentActive = useSelector(selectCurrentActive);
  const projects = useSelector(selectProjects);
  const onCurrentItemClick = key => {
    if (!currentActive || currentActive !== key) {
      dispatch(currentActiveSetAction(key));
    }
  };

  return (
    <aside className="side-bar">
      <ul className="side-bar-list">
        {sideBarItems.map(({ key, label, Icon }) =>
          <li
            key={key}
            className="side-bar-list__item"
          >
            <div
              className={classNames(
                'side-bar-list__item__dropdown',
                { active: currentActive === key }
              )}
              onClick={() => onCurrentItemClick(key)}
            >
              <Icon className="side-bar-list__item__icon" />{label}
            </div>
            {currentActive === key && <Projects label={label} items={projects.filter(project => project.type === key)} />}
          </li>
        )}
      </ul>
    </aside>
  );
}
