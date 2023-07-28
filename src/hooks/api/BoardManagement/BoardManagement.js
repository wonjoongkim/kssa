import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const boardManagement = createApi({
    reducerPath: 'boardManagement',
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
        // 공지사항 리스트
        selectNoticeList: builder.mutation({
            query: (body) => ({
                url: 'board/selectNoticeList.do',
                method: 'POST',
                body: body
            })
        }),

        // 공지사항 상세조회
        selectNotice: builder.mutation({
            query: (body) => ({
                url: 'board/selectNotice.do',
                method: 'POST',
                body: body
            })
        }),

        // 공지사항 등록
        insertNotice: builder.mutation({
            query: (body) => ({
                url: 'board/insertNotice.do',
                method: 'POST',
                body: body
            })
        }),

        // 공지사항 수정
        updateNotice: builder.mutation({
            query: (body) => ({
                url: 'board/updateNotice.do',
                method: 'POST',
                body: body
            })
        }),

        // 공지사항 삭제
        deleteNotice: builder.mutation({
            query: (body) => ({
                url: 'board/deleteNotice.do',
                method: 'POST',
                body: body
            })
        }),

        // FAQ 리스트
        selectFAQList: builder.mutation({
            query: (body) => ({
                url: 'board/selectFAQList.do',
                method: 'POST',
                body: body
            })
        }),

        // FAQ 상세조회
        selectFAQList: builder.mutation({
            query: (body) => ({
                url: 'board/selectFAQList.do',
                method: 'POST',
                body: body
            })
        }),

        // FAQ 상세조회
        selectFAQ: builder.mutation({
            query: (body) => ({
                url: 'board/selectFAQ.do',
                method: 'POST',
                body: body
            })
        }),

        // FAQ 등록
        insertFAQ: builder.mutation({
            query: (body) => ({
                url: 'board/insertFAQ.do',
                method: 'POST',
                body: body
            })
        }),

        // FAQ 수정
        updateFAQ: builder.mutation({
            query: (body) => ({
                url: 'board/updateFAQ.do',
                method: 'POST',
                body: body
            })
        }),

        // FAQ 삭제
        deleteFAQ: builder.mutation({
            query: (body) => ({
                url: 'board/deleteFAQ.do',
                method: 'POST',
                body: body
            })
        }),

        // 교육안내 리스트
        selectInfoList: builder.mutation({
            query: (body) => ({
                url: 'board/selectInfoList.do',
                method: 'POST',
                body: body
            })
        }),

        // 교육안내 상세조회
        selectInfoList: builder.mutation({
            query: (body) => ({
                url: 'board/selectInfoList.do',
                method: 'POST',
                body: body
            })
        }),

        // 교육안내 상세조회
        selectInfo: builder.mutation({
            query: (body) => ({
                url: 'board/selectInfo.do',
                method: 'POST',
                body: body
            })
        }),

        // 교육안내 등록
        insertInfo: builder.mutation({
            query: (body) => ({
                url: 'board/insertInfo.do',
                method: 'POST',
                body: body
            })
        }),

        // 교육안내 수정
        updateInfo: builder.mutation({
            query: (body) => ({
                url: 'board/updateInfo.do',
                method: 'POST',
                body: body
            })
        }),

        // 교육안내 삭제
        deleteInfo: builder.mutation({
            query: (body) => ({
                url: 'board/deleteInfo.do',
                method: 'POST',
                body: body
            })
        })
    })
});

export const {
    useSelectNoticeListMutation, // 공지사항 리스트
    useSelectNoticeMutation, // 공지사항 상세조회
    useInsertNoticeMutation, // 공지사항 등록
    useUpdateNoticeMutation, // 공지사항 수정
    useDeleteNoticeMutation, // 공지사항 삭제

    useSelectFAQListMutation, // FAQ 리스트
    useSelectFAQMutation, // FAQ 상세조회
    useInsertFAQMutation, // FAQ 등록
    useUpdateFAQMutation, // FAQ 수정
    useDeleteFAQMutation, // FAQ 삭제

    useSelectInfoListMutation, // 교육안내 리스트
    useSelectInfoMutation, // 교육안내 상세조회
    useInsertInfoMutation, // 교육안내 등록
    useUpdateInfoMutation, // 교육안내 수정
    useDeleteInfoMutation // 교육안내 삭제
} = boardManagement;
