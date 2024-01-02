import { accountApi } from "./api/accountApi";
import globalSlice from "./reducer/globalSlice";

const { combineReducers } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  global: globalSlice,
  [accountApi.reducerPath]: accountApi.reducer,
});
export default rootReducer;
