import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Index from './pages/Index';
import Layout from './components/Layout';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path="/" component={Index} />
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
