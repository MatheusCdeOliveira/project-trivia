import { Route, Switch } from 'react-router-dom';
import './App.css';
import Feedback from './pages/Feedback';
import Games from './pages/Games';
import Login from './pages/Login';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/jogo" component={ Games } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
