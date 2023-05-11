import { configureStore } from "@reduxjs/toolkit";
import Int from "./intSlice";
const store = configureStore({
  reducer: {
    intReducer: Int,
  },
});

export default store;
