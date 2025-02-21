import { configureStore } from "@reduxjs/toolkit";
import snackBarReducer from "./slices/snackBarSlice"

export const store = configureStore({
  reducer: {
    snackbar: snackBarReducer
  },
});
