import { accountApi } from "./api/accountApi";
import { taskApi } from "./api/taskApi";
import globalSlice from "./reducer/globalSlice";

const { combineReducers } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  global: globalSlice,
  [accountApi.reducerPath]: accountApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
});
export default rootReducer;
