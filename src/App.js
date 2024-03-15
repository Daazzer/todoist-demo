import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Layout from './components/Layout';
import Index from './pages/Index';
import Project from './pages/Project';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/:type/:id" component={Project} />
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
