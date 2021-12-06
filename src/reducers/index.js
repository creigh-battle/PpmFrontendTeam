import { combineReducers } from "redux";
import backlogReducer from "./backlogReducer";
import drawerReducer from "./drawerReducer";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";
import securityReducer from "./securityReducer";
import userInterfaceReducer from "./userInterfaceReducer";

export default combineReducers({
  errors: errorReducer,
  project: projectReducer,
  backlog: backlogReducer,
  security: securityReducer,
  userInterface: userInterfaceReducer,
  drawer: drawerReducer
});
