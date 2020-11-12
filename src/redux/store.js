import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import billReducer from "./billReducer";

const rootReducer = combineReducers({
  bill: billReducer,
  user: userReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
