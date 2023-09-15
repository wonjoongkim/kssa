import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const referenceManagement = createApi({
    reducerPath: 'referenceManagement',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,
        prepareHeaders: (headers) => {
            const MonitorView = window.sessionStorage.getItem('MonitorView');
            const jwtToken = localStorage.getItem('userToken');
            if (MonitorView) {
                headers.set('authorization', `Bearer ${MonitorView}`);
            } else {
                if (jwtToken) {
                    headers.set('authorization', `Bearer ${jwtToken}`);
                }
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        // 자료실 리스트
        selectReferenceRoomList: builder.mutation({
            query: (body) => ({
                url: 'board/selectReferenceRoomList.do',
                method: 'POST',
                body: body
            })
        }),

        // 자료실 상세조회
        selectReferenceRoom: builder.mutation({
            query: (body) => ({
                url: 'board/selectReferenceRoom.do',
                method: 'POST',
                body: body
            })
        }),

        // 자료실 등록
        insertReferenceRoom: builder.mutation({
            query: (body) => ({
                url: 'board/insertReferenceRoom.do',
                method: 'POST',
                body: body
            })
        }),

        // 자료실 수정
        updateReferenceRoom: builder.mutation({
            query: (body) => ({
                url: 'board/updateReferenceRoom.do',
                method: 'POST',
                body: body
            })
        }),

        // 자료실 삭제
        deleteReferenceRoom: builder.mutation({
            query: (body) => ({
                url: 'board/deleteReferenceRoom.do',
                method: 'POST',
                body: body
            })
        }),

        // 파일 삭제
        deleteFile: builder.mutation({
            query: (body) => ({
                url: 'board/deleteFile.do',
                method: 'POST',
                body: body
            })
        })
    })
});

export const {
    useSelectReferenceRoomListMutation,
    useSelectReferenceRoomMutation,
    useInsertReferenceRoomMutation,
    useUpdateReferenceRoomMutation,
    useDeleteReferenceRoomMutation,
    useDeleteFileMutation // 파일 삭제
} = referenceManagement;
