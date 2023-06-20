import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ResponseType } from '../../types/ResponseType';
import { PathAPI } from '../../enums/PathAPI';
import { SendMessageType } from '../../types/SendMessageType';
import { FolderActionType } from '../../types/FolderActionType';
import { TagType } from '../../enums/tagType';
import { FetchMessagesType } from '../../types/FetchMessagesType';
import { DeleteMessageType } from '../../types/DeleteMessageType';

export const messagesAPISlice = createApi({
    reducerPath: 'messagesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_REMOTE_BASE_URL,
        credentials: 'include',
    }),
    tagTypes: [TagType.Message],
    endpoints: (builder) => ({
        fetchMessages: builder.query<ResponseType<FetchMessagesType>, { userEmail: string }>({
            query: ({ userEmail }) => `${PathAPI.Message}/${userEmail}`,
            providesTags: [TagType.Message],
        }),
        sendMessage: builder.mutation<ResponseType, SendMessageType>({
            query: ({ sender, recipient, message, subject }) => ({
                url: `${PathAPI.Message}`,
                method: 'POST',
                body: { sender, recipient, message, subject },
            }),
            invalidatesTags: [TagType.Message],
        }),
        changeMessagesFolder: builder.mutation<ResponseType, FolderActionType>({
            query: ({ folder, messagesId }) => ({
                url: `${PathAPI.Message}`,
                method: 'PUT',
                body: { folder, messagesId },
            }),
            invalidatesTags: [TagType.Message],
        }),
        deleteMessage: builder.mutation<ResponseType, { messagesId: number[] }>({
            query: ({ messagesId }) => ({
                url: `${PathAPI.Message}/incoming`,
                method: 'PUT',
                body: { messagesId },
            }),
            invalidatesTags: [TagType.Message],
        }),
        markReadMessages: builder.mutation<ResponseType, { messagesId: number[] }>({
            query: ({ messagesId }) => ({
                url: `${PathAPI.Message}/mark`,
                method: 'PUT',
                body: { messagesId },
            }),
            invalidatesTags: [TagType.Message],
        }),
    }),
});

export const {
    useFetchMessagesQuery,
    useLazyFetchMessagesQuery,
    useSendMessageMutation,
    useDeleteMessageMutation,
    useChangeMessagesFolderMutation,
    useMarkReadMessagesMutation,
} = messagesAPISlice;
