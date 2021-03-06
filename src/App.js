import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./components/project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/project/UpdateProject";
import ProjectBoard from "./components/project_board/ProjectBoard";
import AddProjectTask from "./components/project_board/project_tasks/AddProjectTask";
import UpdateProjectTask from "./components/project_board/project_tasks/UpdateProjectTask";
import Landing from "./components/layout/Landing";
import Register from "./components/user_management/Register";
import Login from "./components/user_management/Login";
import jwt_decode from "jwt-decode";
import setJwtToken from "./security_utils/setJwtToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecureRoute from "./security_utils/SecureRoute";
import Sidebar from "./components/layout/Sidebar";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJwtToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header>
            {
              //Public Routes
            }
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {
              //Private Routes
            }
            <Switch>
              <SecureRoute exact path="/dashboard" component={Dashboard} />
              <SecureRoute exact path="/addProject" component={AddProject} />
              <SecureRoute
                exact
                path="/updateProject/:id"
                component={UpdateProject}
              />
              <SecureRoute
                exact
                path="/projectBoard/:id"
                component={ProjectBoard}
              />
              <SecureRoute
                exact
                path="/addProjectTask/:id"
                component={AddProjectTask}
              />
              <SecureRoute
                exact
                path="/updateProjectTask/:backlog_id/:pt_id"
                component={UpdateProjectTask}
              />
            </Switch>
          </Header>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
