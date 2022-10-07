import { Route, Switch } from 'react-router-dom';
import './App.css';
import Games from './pages/Games';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/games" component={ Games } />
      </Switch>
    </div>
  );
}

export default App;
