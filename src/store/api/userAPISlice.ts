import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ResponseType } from '../../types/ResponseType';
import { PathAPI } from '../../enums/PathAPI';
import { CreateFolderType } from '../../types/CreateFolderType';
import { TagType } from '../../enums/tagType';

export const userAPISlice = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_REMOTE_BASE_URL,
        credentials: 'include',
    }),
    tagTypes: [TagType.Folder],
    endpoints: (builder) => ({
        getFolders: builder.query<ResponseType<{ folders: string[] }>, { userId: number | null }>({
            query: ({ userId }) => `${PathAPI.Folder}/${userId}`,
            providesTags: [TagType.Folder],
        }),
        createFolder: builder.mutation<ResponseType, CreateFolderType>({
            query: ({ nameFolder, userId }) => ({
                url: `${PathAPI.Folder}`,
                method: 'POST',
                body: { nameFolder, userId },
            }),
            invalidatesTags: [TagType.Folder],
        }),
        deleteFolder: builder.mutation<ResponseType, { userId: number; nameFolder: string }>({
            query: ({ userId, nameFolder }) => ({
                url: `${PathAPI.Folder}/${userId}/${nameFolder}`,
                method: 'DELETE',
            }),
            invalidatesTags: [TagType.Folder],
        }),
    }),
});

export const { useGetFoldersQuery, useCreateFolderMutation, useDeleteFolderMutation } = userAPISlice;
