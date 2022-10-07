import { Route, Switch } from 'react-router-dom';
import './App.css';
import Games from './pages/Games';
import Login from './pages/Login';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/jogo" component={ Games } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}

export default App;
