import { combineReducers } from "redux";
import welcomeGuide from "./reducers/welcomeGuide";
import category from "./reducers/category";
import places from "./reducers/places";
import auth from "./reducers/auth";

export default combineReducers({
  welcomeGuide,
  auth,
  category,
  places,
});
