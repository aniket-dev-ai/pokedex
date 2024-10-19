import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";

// config for local storage.
const persistConfig = {
  key: "pokStore",
  version: 1,
  storage,
};

// combine all reducers/slices using combineReducers function.
const combinedReducers = combineReducers({
  user: userReducer,
});

// persist the combined reducers in local storage.
const persistedReducer = persistReducer(persistConfig, combinedReducers);

// finally instead of giving normal non-persisted reducers give redux that persisted reducer to distribute to whole app.
export const store = configureStore({
  reducer: persistedReducer,
});
