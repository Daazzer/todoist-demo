import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Inbox from './pages/Inbox';
import Today from './pages/Today';
import Next7days from './pages/Next7days';
import Layout from './components/Layout';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path="/" component={Inbox} />
            <Route path="/today" component={Today} />
            <Route path="/next7days" component={Next7days} />
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
