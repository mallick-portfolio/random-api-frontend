import { accountApi } from "./api/accountApi";
import { notificationApi } from "./api/notificationApi";
import { taskApi } from "./api/taskApi";
import dataSlice from "./reducer/dataSlice";
import globalSlice from "./reducer/globalSlice";
import modalSlice from "./reducer/modalSlice";

const { combineReducers } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  global: globalSlice,
  modal: modalSlice,
  apiStateData: dataSlice,
  [accountApi.reducerPath]: accountApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
});
export default rootReducer;
