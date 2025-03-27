import { combineReducers } from "redux";
import detailsReducer from "./slices/details";

export const rootReducers = combineReducers({
  detailsReducer,
});

export default rootReducers;
