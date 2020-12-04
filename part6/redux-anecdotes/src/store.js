import { createStore, combineReducers } from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
});
const store = createStore(reducers, composeWithDevTools());

export default store;
