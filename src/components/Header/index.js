import { CgMathPlus } from "react-icons/cg";
import { SlGhost } from "react-icons/sl";
import './index.css';

export default function Header() {
  return (
    <header className="header">
      <a href="/">
        <img className="logo" src="/images/logo.png" alt="logo" />
      </a>
      <div className="header__right">
        <CgMathPlus className="icon add" />
        <SlGhost className="icon ghost" />
      </div>
    </header>
  )
}
