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
      query: () => "auth/verify",
    }),
    getUserInfo: builder.query({
      query: (userID) => `users/Profile/:${userID}`,
    }),
    
  }),
});
export const { useCurrentApiQuery } = LocationApi;
export const {
  useGetVerificationCodeQuery,
  useGetUserInfoQuery,
} = ServerSideApiGet;

//<-------------- POST REQ ----------------->
export const ServerSideApiPost = createApi({
  reducerPath: `ServerSideApiPost`,
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5500`,
  }),
  endpoints: (builder) => ({
    sendMeEmail: builder.mutation({
      query: (email) => ({
        url: "/email",
        method: "POST",
        body: email,
      }),
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: `auth/register`,
        method: "POST",
        body: userData,
      }),
    }),
    verifyAccount: builder.mutation({
      query: (email) => ({
        url: `email/verify`,
        method: "POST",
        body: email,
      }),
    }),
    Login: builder.mutation({
      query: (user) => ({
        url: "auth/login",
        method: "POST",
        body: user,
      }),
    }),
    Logout: builder.mutation({
      query: () => ({
        method: "POST",
        url: "/auth/logout",
      }),
    }),
    ConfirmPassword: builder.mutation({
      query: (userPassword) => ({
        url: `authZ/confirmPassword`,
        method: `POST`,
        body: userPassword,
      }),
    }),
    Notify: builder.mutation({
      query: (ip) => ({
        url: "",
        method: "POST",
        body: ip,
      }),
    }),
    DeleteUser: builder.mutation({
      query: (loggedAccount) => ({
        url: `auth/deleteUser`,
        method: `POST`,
        body: loggedAccount,
      }),
    }),
    AccountConfigure: builder.mutation({
      query: (changes) => ({
        url: "accountConfig/",
        method: "POST",
        body: changes,
      }),
    }),
    GenerateResetPasswordLink: builder.mutation({
      query: (userEmail) => ({
        url: "auth/ResetPasswordLink",
        method: "POST",
        body: userEmail,
      }),
    }),
    ChangePassword: builder.mutation({
      query: (newPassword) => ({
        url: "auth/changePassword",
        method: "POST",
        body: newPassword,
      }),
    }),
  }),
});

export const {
  useSendMeEmailMutation,
  useCreateUserMutation,
  useVerifyAccountMutation,
  useLoginMutation,
  useNotifyMutation,
  useConfirmPasswordMutation,
  useDeleteUserMutation,
  useAccountConfigureMutation,
  useLogoutMutation,
  useGenerateResetPasswordLinkMutation,
  useChangePasswordMutation
} = ServerSideApiPost;
