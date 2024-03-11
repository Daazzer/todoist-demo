import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom';
import { BsInboxFill } from 'react-icons/bs';
import { BsCalendar } from "react-icons/bs";
import { BsCalendar3 } from "react-icons/bs";
import Header from './components/Header';
import Inbox from './pages/Inbox';
import Today from './pages/Today';
import Next7days from './pages/Next7days';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main">
          <aside className="side-bar">
            <ul className="side-bar-list">
              <li className="side-bar-list__item">
                <Link to="/">
                  <BsInboxFill className="item-icon" />
                  <label className="item-label">Inbox</label>
                </Link>
              </li>
              <li className="side-bar-list__item">
                <Link to="/today">
                  <BsCalendar className="item-icon" />
                  <label className="item-label">Today</label>
                </Link>
              </li>
              <li className="side-bar-list__item">
                <Link to="/next7days">
                  <BsCalendar3 className="item-icon" />
                  <label className="item-label">Next7days</label>
                </Link>
              </li>
            </ul>
          </aside>
          <article className="content-bar">
            <Switch>
              <Route exact path="/" component={Inbox} />
              <Route path="/today" component={Today} />
              <Route path="/next7days" component={Next7days} />
            </Switch>
          </article>
        </main>
      </div>
    </Router>
  );
}

export default App;
