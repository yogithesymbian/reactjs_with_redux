import { combineReducers, createStore } from "redux";
import authReducer from "./AuthReducer";

const rootReducer = {
  auth: authReducer
};

const store = createStore(
  combineReducers(rootReducer),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
