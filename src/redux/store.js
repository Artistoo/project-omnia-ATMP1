import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { LocationApi, ServerSideApiPost, ServerSideApiGet } from "./API";

import Int from "./intSlice";
const store = configureStore({
  reducer: {
    [LocationApi.reducerPath]: LocationApi.reducer,
    [ServerSideApiPost.reducerPath]: ServerSideApiPost.reducer,
    [ServerSideApiGet.reducerPath]: ServerSideApiGet.reducer,
    intReducer: Int,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      LocationApi.middleware,
      ServerSideApiPost.middleware,
      ServerSideApiGet.middleware
    ),
});
setupListeners(store.dispatch);

export default store;
