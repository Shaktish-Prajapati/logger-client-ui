import "../css/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../components/Screens/Login";
// import Register from "./components/Register";
import SignUp from "./Screens/SignUp";
import Navbarr from "./ui/Navbarr";
import LogTable from "./Screens/LogTable";
import NewLogTable from "./Screens/NewLogTable";
import Analytics from "./Screens/Analytics";
import CustomPagination from "./utils/CustomPagination";
import Protected from "./utils/Protected";
import FrogotPassowrd from "./Screens/ForgotPassword";
import ResetPassword from "./Screens/resetPassword";
import Home from "./Screens/Home";

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
