import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';
import { BsSnapchat } from 'react-icons/bs';
import { setCurrentActiveAction } from '@/store/reducers/currentActiveSlice';
import './index.scss';

export default function Header() {
  const dispatch = useDispatch(setCurrentActiveAction);
  
  return (
    <header className="header">
      <Link to="/" onClick={() => dispatch(setCurrentActiveAction(''))}>
        <img className="logo" src="/images/logo.png" alt="logo" />
      </Link>
      <div className="header__right">
        <BsPlusLg className="icon add" />
        <BsSnapchat className="icon ghost" />
      </div>
    </header>
  )
}
