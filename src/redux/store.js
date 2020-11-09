import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import userReducer from "./userReducer";
import billReducer from "./billReducer";

const rootReducer = combineReducers({
  bill: billReducer,
  user: userReducer,
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
