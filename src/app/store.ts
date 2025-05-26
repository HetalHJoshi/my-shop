import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
  middleware: (getDefault) =>
    getDefault()
      .concat
      // add any custom middleware here
      (),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
