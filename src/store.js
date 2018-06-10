import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import ingredients from "./reducers/ingredientsReducer";
import cakes from "./reducers/cakeReducer";
import login from './reducers/signInReducer';


export default createStore(
  combineReducers({
    ingredients,
    cakes,
    login
  }),
  {},
  applyMiddleware(thunk, logger)
);
