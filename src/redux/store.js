import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { LocationApi, ServerSideApi } from "./API";

import Int from "./intSlice";
const store = configureStore({
  reducer: {
    [LocationApi.reducerPath]: LocationApi.reducer,
    [ServerSideApi.reducerPath]: ServerSideApi.reducer,
    intReducer: Int,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(LocationApi.middleware, ServerSideApi.middleware),
});
setupListeners(store.dispatch);

export default store;
