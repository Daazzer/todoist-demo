import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { BsSnapchat } from "react-icons/bs";
import './index.scss';

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img className="logo" src="/images/logo.png" alt="logo" />
      </Link>
      <div className="header__right">
        <BsPlusLg className="icon add" />
        <BsSnapchat className="icon ghost" />
      </div>
    </header>
  )
}
