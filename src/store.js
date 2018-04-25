import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import ingredients from "./reducers/ingredientsReducer";
import cakes from "./reducers/cakeReducer";

export default createStore(
  combineReducers({
    ingredients,
    cakes
  }),
  {},
  applyMiddleware(thunk, logger)
);
