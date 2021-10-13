import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import SignUp from './components/SignUp';
import Navbarr from './components/Navbarr';
import Home from './components/Home';
import LogTable from './components/LogTable';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbarr /> */}
      <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/register' component={SignUp} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/logTable' component={LogTable} />


      </Switch>
      
      </Router>
    </div>
  );
}

export default App;
