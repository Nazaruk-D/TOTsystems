import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { MessageType } from '../../types/MessageType';
import { ResponseType } from '../../types/ResponseType';
import { SendMessageType } from '../../types/SendMessageType';
import { PathAPI } from '../../enums/PathAPI';
import { CreateFolderType } from '../../types/CreateFolderType';

export const userAPISlice = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_REMOTE_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getMessages: builder.query<ResponseType<MessageType>, { userId: string }>({
            query: ({ userId }) => `userId`,
        }),
        createFolder: builder.mutation<ResponseType, CreateFolderType>({
            query: ({ nameFolder, userId }) => ({
                url: `${PathAPI.Folder}`,
                method: 'POST',
                body: { nameFolder, userId },
            }),
        }),
    }),
});

export const { useGetMessagesQuery, useCreateFolderMutation } = userAPISlice;
