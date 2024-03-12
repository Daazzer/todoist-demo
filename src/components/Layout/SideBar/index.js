import { NavLink, useLocation } from 'react-router-dom';
import { BsInboxFill } from 'react-icons/bs';
import { BsCalendar } from 'react-icons/bs';
import { BsCalendar3 } from 'react-icons/bs';
import Projects from './Projects';
import './index.scss';

const links = [
  {
    to: '/',
    exact: true,
    Icon: BsInboxFill,
    label: 'Inbox'
  },
  {
    to: '/today',
    Icon: BsCalendar,
    label: 'Today'
  },
  {
    to: '/next7days',
    Icon: BsCalendar3,
    label: 'Next7days'
  }
]

export default function SideBar() {
  const { pathname } = useLocation();

  return (
    <aside className="side-bar">
      <ul className="side-bar-list">
        {links.map(({ to, label, exact, Icon }) =>
          <li key={to} className="side-bar-list__item">
            <NavLink
              className="side-bar-list__item__link"
              exact={exact}
              to={to}
            >
              <Icon className="side-bar-list__item__icon" />{label}
            </NavLink>
            {pathname === to && <Projects />}
          </li>
        )}
      </ul>
    </aside>
  );
}
