import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import userReducer from "./reducers/userReducer";
import serviceReducer from "./reducers/serviceReducer";

const rootReducer = combineReducers({
    userReducer,
    serviceReducer
});

export default createStore(rootReducer, applyMiddleware(promise));