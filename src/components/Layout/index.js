import Header from './Header';
import SideBar from './SideBar';
import './index.scss';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="main">
        <SideBar />
        <article className="content-bar">
          {children}
        </article>
      </main>
    </>
  );
}
