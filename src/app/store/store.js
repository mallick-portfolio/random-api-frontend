import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./rootReducer";
import { accountApi } from "./api/accountApi";
import { taskApi } from "./api/taskApi";
import { notificationApi } from "./api/notificationApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["global"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      accountApi.middleware,
      taskApi.middleware,
      notificationApi.middleware,
    ]),
});

export const persistor = persistStore(store);
