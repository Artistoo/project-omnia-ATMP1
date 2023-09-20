import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  LocationApi,
  ServerSideApiPost,
  ServerSideApiGet,
  PixabayAPI,
} from "./API";
import userState_slice from "./userStateSlice";
import Int from "./intSlice";
const store = configureStore({
  reducer: {
    //API
    [PixabayAPI.reducerPath]: PixabayAPI.reducer,
    [LocationApi.reducerPath]: LocationApi.reducer,
    [ServerSideApiPost.reducerPath]: ServerSideApiPost.reducer,
    [ServerSideApiGet.reducerPath]: ServerSideApiGet.reducer,
    //SLICES
    userState: userState_slice,
    intReducer: Int,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      LocationApi.middleware,
      ServerSideApiPost.middleware,
      ServerSideApiGet.middleware,
      PixabayAPI.middleware 
    ),
});
setupListeners(store.dispatch);

export default store;
