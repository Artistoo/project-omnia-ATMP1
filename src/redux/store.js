import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { LocationApi, contactMe } from "./API";

import Int from "./intSlice";
const store = configureStore({
  reducer: {
    [LocationApi.reducerPath]: LocationApi.reducer,
    [contactMe.reducerPath]: contactMe.reducer,
    intReducer: Int,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(LocationApi.middleware, contactMe.middleware),
});
setupListeners(store.dispatch);

export default store;
