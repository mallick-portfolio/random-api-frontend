import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./reducer/globalSlice";
import { accountApi } from "./api/accountApi";
export const store = configureStore({
  reducer: {
    global: globalReducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(accountApi.middleware),
});
