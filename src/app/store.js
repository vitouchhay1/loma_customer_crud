import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import userReducer from "./slices/user";
import messageReducer from "./slices/message";

const reducer = {
  auth: authReducer,
  user: userReducer,
  message: messageReducer
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
