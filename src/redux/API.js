import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//<----------- GET REQ ------------------>
export const LocationApi = createApi({
  reducerPath: `ApiInfo`,
  baseQuery: fetchBaseQuery({
    baseUrl: `http://ip-api.com/json/?fields=61439`,
  }),
  endpoints: (builder) => ({
    currentApi: builder.query({
      query: () => "",
    }),
  }),
});
export const { useCurrentApiQuery } = LocationApi;

//<-------------- POST REQ ----------------->

export const ServerSideApi = createApi({
  reducerPath: `ServerSideApi`,
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5500/`,
  }),
  endpoints: (builder) => ({
    sendMeEmail: builder.mutation({
      query: (email) => ({
        url: "/contact",
        method: "POST",
        body: email,
      }),
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: `/auth/signup`,
        method: "POST",
        body: userData,
      }),
    }),
  }),
});
export const { useSendMeEmailMutation, useCreateUserMutation } = ServerSideApi;
