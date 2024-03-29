import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { method } from 'lodash';

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
      query: () => 'http://ip-api.com/json/?fields=61439',
    }),
    listOfCountries: builder.query({
      query: () => `https://restcountries.com/v3.1/all`,
    }),
  }),
});

export const PixabayAPI = createApi({
  reducerPath: 'pixaby',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pixabay.com/api/',
  }),
  endpoints: (builder) => ({
    PhotosSearchGet: builder.query({
      query: ({ param, page, per_page }) => `videos/?key=${keys.pixabay}&q=${param}&page=${page}&per_page=${per_page}&safe_search=true`,
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
      query: () => 'email/verify',
    }),
    GenerateQR: builder.query({
      query: (user_name) => `auth/GenerateQR/${user_name}`,
    }),
    /* USER ROUTER */
    getUserInfo: builder.query({
      query: (userID) => `users/profile/${userID}`,
    }),
    /* CHANNELS ROUTER */
    checkAvailability: builder.query({
      query: (name) => `channels/check_availibility/${name}`,
    }),
    searchMemebers: builder.mutation({
      query: ({ search_param, channel_id }) => ({
        url: `channels/channelMembersSearch/${search_param}/${channel_id}`,
        method: `GET`,
      }),
    }),
  }),
});

//Export Get Requiests
export const { usePhotosSearchGetQuery } = PixabayAPI;
export const { useCurrentApiQuery, useListOfCountriesQuery } = LocationApi;

export const { useGetVerificationCodeQuery, useGetUserInfoQuery, useCheckAvailabilityQuery, useSearchMemebersMutation, useGenerateQRQuery } = ServerSideApiGet;

//<-------------- POST REQ ----------------->
export const ServerSideApiPost = createApi({
  reducerPath: `ServerSideApiPost`,
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5500`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    //FEATURES
    Search: builder.mutation({
      query: (body) => ({
        url: `search`,
        method: `POST`,
        body,
      }),
    }),

    //CONFIGURATION
    AccountConfigure: builder.mutation({
      query: (changes) => ({
        url: 'accountConfig/',
        method: 'POST',
        body: changes,
      }),
    }),

    //AUTH
    Login: builder.mutation({
      query: (user) => ({
        url: 'auth/login',
        method: 'POST',
        body: user,
      }),
    }),
    Logout: builder.mutation({
      query: () => ({
        method: 'POST',
        url: '/auth/logout',
      }),
    }),

    //SECURITY
    verifyAccount: builder.mutation({
      query: (email) => ({
        url: `email/verify`,
        method: 'POST',
        body: email,
      }),
    }),
    GenerateResetPasswordLink: builder.mutation({
      query: (userEmail) => ({
        url: 'auth/ResetPasswordLink',
        method: 'POST',
        body: userEmail,
      }),
    }),
    ChangePassword: builder.mutation({
      query: (newPassword) => ({
        url: 'auth/changePassword',
        method: 'POST',
        body: newPassword,
      }),
    }),
    Notify: builder.mutation({
      query: (ip) => ({
        url: '',
        method: 'POST',
        body: ip,
      }),
    }),
    ConfirmPassword: builder.mutation({
      query: (userPassword) => ({
        url: `authZ/confirmPassword`,
        method: `POST`,
        body: userPassword,
      }),
    }),

    //ADMIN
    sendMeEmail: builder.mutation({
      query: (email) => ({
        url: '/email',
        method: 'POST',
        body: email,
      }),
    }),

    //USER
    UserState: builder.mutation({
      query: () => ({ url: `auth/userState`, method: 'POST' }),
    }),
    DeleteUser: builder.mutation({
      query: (loggedAccount) => ({
        url: `auth/deleteUser`,
        method: `POST`,
        body: loggedAccount,
      }),
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: `auth/register`,
        method: 'POST',
        body: userData,
      }),
    }),

    //PAYMENT
    CreateOrder: builder.mutation({
      query: (order_param) => ({
        method: `POST`,
        url: `payment/create_order`,
        body: order_param,
        headers: { 'Content-type': 'application/json' },
      }),
    }),

    //CHANNELS
    DeleteChannel: builder.mutation({
      query: (body) => ({
        url: 'channels/delete_channel',
        method: `POST`,
        body,
      }),
    }),
    createChannel: builder.mutation({
      query: (data) => ({
        url: 'channels/create_channel',
        body: data,
        method: 'POST',
      }),
    }),
    FetchChannels: builder.mutation({
      query: (channel_required_payload) => ({
        url: `channels/fetch_dynamic_channels`,
        method: `POST`,
        body: channel_required_payload,
      }),
    }),
    ChannelInteract: builder.mutation({
      query: (interactionData) => ({
        method: 'POST',
        body: { ...interactionData },
        url: 'channels/channelInteract',
      }),
    }),
    ReportChannel: builder.mutation({
      query: (report_info) => ({
        method: 'POST',
        body: report_info,
        url: `channels/channel_report`,
      }),
    }),
    ChannelJoinRequest: builder.mutation({
      query: (channel_name) => ({
        method: 'POST',
        body: channel_name,
        url: `channels/channel_join`,
      }),
    }),
    JoinRequiestNotification: builder.mutation({
      query: (notification_body) => ({
        url: 'notification/',
        body: notification_body,
        method: 'POST',
      }),
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
  useCreateChannelMutation,
  useDeleteChannelMutation,
  useCreateOrderMutation,
  useFetchChannelsMutation,
  useChannelInteractMutation,
  useReportChannelMutation,
  useChannelJoinRequestMutation,
  useJoinRequiestNotificationMutation,
  usePayMutation,
} = ServerSideApiPost;
