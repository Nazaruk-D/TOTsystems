import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ResponseType } from '../../types/ResponseType';
import { LoginType, RegistrationType } from '../../types/AuthType';
import { PathAPI } from '../../enums/PathAPI';
import { MessageType } from '../../types/MessageType';
import { UserType } from '../../types/UserType';

export const authAPISlice = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_REMOTE_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        me: builder.query<ResponseType<UserType>, Record<string, never>>({
            query: () => `${PathAPI.Me}`,
        }),
        registration: builder.mutation<ResponseType, RegistrationType>({
            query: ({ name, email, password }) => ({
                url: `${PathAPI.Registration}`,
                method: 'POST',
                body: { name, email, password },
            }),
        }),
        login: builder.mutation<ResponseType<UserType>, LoginType>({
            query: ({ email, password }) => ({
                url: `${PathAPI.Login}`,
                method: 'POST',
                body: { email, password },
            }),
        }),
        logout: builder.mutation<ResponseType, Record<string, never>>({
            query: () => ({
                url: `${PathAPI.Logout}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useRegistrationMutation, useLogoutMutation, useLoginMutation, useMeQuery } = authAPISlice;
