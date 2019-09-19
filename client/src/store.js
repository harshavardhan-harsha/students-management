import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import studentReducer from "./reducers/studentReducer";
const middleware = [thunk];

const store = createStore(studentReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
