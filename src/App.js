import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
// import Register from "./components/Register";
import SignUp from "./components/SignUp";
import Navbarr from "./components/Navbarr";
import Home from "./components/Home";
import LogTable from "./components/LogTable";
import NewLogTable from "./components/NewLogTable";
import Analytics from "./components/Analytics";
import CustomPagination from "./components/CustomPagination";
import Protected from "./components/Protected";
import FrogotPassowrd from "./components/Screens/ForgotPassword";
import ResetPassword from "./components/Screens/resetPassword";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbarr /> */}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={SignUp} />
          {/* <Route exact path='/home' component={Home} /> */}
          <Route exact path="/logTable" component={LogTable} />
          <Route exact path="/newlogTable" component={NewLogTable} />
          {/* <Route exact path="/newlogTable" component={LogTable} /> */}
          <Route exact path="/customPagination" component={CustomPagination} />
          <Route exact path="/analytics" component={Analytics} />

          {/*forgetpassword*/}
          <Route path="/forgetPassword" component={FrogotPassowrd} />

          {/*resetPassword*/}
          <Route path="/resetPassword" component={ResetPassword} />

          <Protected exact path="/home" Component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
