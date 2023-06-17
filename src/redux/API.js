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

export const ServerSideApiGet = createApi({
  reducerPath: `ServerSideApiGet`,
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5500/`,
  }),
  endpoints: (builder) => ({
    getVerificationCode: builder.query({
      query: () => "/auth/verify",
    }),
  }),
});
export const { useCurrentApiQuery } = LocationApi;
export const { useGetVerificationCodeQuery } = ServerSideApiGet;
//<-------------- POST REQ ----------------->
export const ServerSideApiPost = createApi({
  reducerPath: `ServerSideApiPost`,
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
    verifyAccount: builder.mutation({
      query: (email) => ({
        url: `/auth/verify`,
        method: "POST",
        body: email,
      }),
    }),
  }),
});
export const {
  useSendMeEmailMutation,
  useCreateUserMutation,
  useVerifyAccountMutation,
} = ServerSideApiPost;
