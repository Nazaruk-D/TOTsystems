import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ResponseType } from '../../types/ResponseType';
import { LoginType, RegistrationType } from '../../types/AuthType';
import { PathAPI } from '../../enums/PathAPI';
import { MessageType } from '../../types/MessageType';
import { UserType } from '../../types/UserType';
import { ServerData } from '../../types/ServerData';
import { SendMessageType } from '../../types/SendMessageType';

export const messagesAPISlice = createApi({
    reducerPath: 'messagesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_REMOTE_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        fetchMessages: builder.query<ResponseType<ServerData>, { userId: string }>({
            query: ({ userId }) => `${PathAPI.Message}`,
        }),
        sendMessage: builder.mutation<ResponseType, SendMessageType>({
            query: ({ sender, recipient, message, subject }) => ({
                url: `${PathAPI.Message}`,
                method: 'POST',
                body: { sender, recipient, message, subject },
            }),
        }),
        deleteMessage: builder.mutation<ResponseType, { ids: string[] }>({
            query: (ids) => ({
                url: `${PathAPI.Message}`,
                method: 'DELETE',
                body: { ids },
            }),
        }),
    }),
});

export const { useFetchMessagesQuery, useLazyFetchMessagesQuery, useSendMessageMutation, useDeleteMessageMutation } =
    messagesAPISlice;
