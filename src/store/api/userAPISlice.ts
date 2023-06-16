import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { MessageType } from '../../types/MessageType';
import { ResponseType } from '../../types/ResponseType';

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
    }),
});

export const { useGetMessagesQuery } = userAPISlice;
