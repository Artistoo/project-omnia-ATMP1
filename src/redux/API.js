import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { method } from "lodash";

const keys = {
  pixabay: import.meta.env.VITE_PIXABAY_API_KEY,
};
//<----------- GET REQ ------------------>
export const LocationApi = createApi({
  reducerPath: `ApiInfo`,
  baseQuery: fetchBaseQuery({
    baseUrl: ``,
  }),
  endpoints: (builder) => ({
    currentApi: builder.query({
      query: () => "http://ip-api.com/json/?fields=61439",
    }),
    listOfCountries: builder.query({
      query: () => `https://restcountries.com/v3.1/all`,
    }),
  }),
});

export const PixabayAPI = createApi({
  reducerPath: "pixaby",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pixabay.com/api/",
  }),
  endpoints: (builder) => ({
    PhotosSearchGet: builder.query({
      /* param, page, type */
      query: ({ result_type, param, page }) =>
        `${result_type === "vid" ? `videos/` : ""}?key=${
          keys.pixabay
        }&q=${param}&page=${page}&per_page=20&safe_search=true`,
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const ServerSideApiGet = createApi({
  reducerPath: `ServerSideApiGet`,
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5500/`,
  }),

  endpoints: (builder) => ({
    /* AUTHENTICATION ROUTER */
    getVerificationCode: builder.query({
      query: () => "auth/verify",
    }),

    /* USER ROUTER */
    getUserInfo: builder.query({
      query: (userID) => `users/profile/${userID}`,
    }),

    /* CHANNELS ROUTER */
    checkAvailability: builder.query({
      query: (name) => `channels/check_availibility/${name}`,
    }),
  }),
});

//Export Get Requiests
export const { usePhotosSearchGetQuery } = PixabayAPI;
export const { useCurrentApiQuery, useListOfCountriesQuery } = LocationApi;

export const {
  useGetVerificationCodeQuery,
  useGetUserInfoQuery,
  useCheckAvailabilityQuery,
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
    Search: builder.mutation({
      query: (body) => ({
        url: `search/${body.params}`,
        method: `POST`,
        body: body.filter,
      }),
    }),
    UserState: builder.mutation({
      query: () => ({ url: `auth/userState`, method: "POST" }),
    }),
  }),
});

//Export Post Requiests
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
  useChangePasswordMutation,
  useSearchMutation,
  useUserStateMutation,
} = ServerSideApiPost;
