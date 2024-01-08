import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const scheduleManagement = createApi({
    reducerPath: 'scheduleManagement',
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
        // 일정 목록
        selectCalendarList: builder.mutation({
            query: (body) => ({
                url: 'schedule/selectCalendarList.do',
                method: 'POST',
                body: body
            })
        }),

        // 일정 등록
        insertCalendar: builder.mutation({
            query: (body) => ({
                url: 'schedule/insertCalendar.do',
                method: 'POST',
                body: body
            })
        }),

        // 일정 수정
        updateCalendar: builder.mutation({
            query: (body) => ({
                url: 'schedule/updateCalendar.do',
                method: 'POST',
                body: body
            })
        }),

        // 일정 상세
        selectCalendar: builder.mutation({
            query: (body) => ({
                url: 'schedule/selectCalendar.do',
                method: 'POST',
                body: body
            })
        }),

        // 일정 수정
        deleteCalendar: builder.mutation({
            query: (body) => ({
                url: 'schedule/deleteCalendar.do',
                method: 'POST',
                body: body
            })
        }),

        // 월간계획표 조회
        selectMonthlyCalendarList: builder.mutation({
            query: (body) => ({
                url: `schedule/selectMonthlyCalendarList.do`,
                method: 'POST',
                body: body
            })
        })
    })
});

export const {
    useSelectCalendarListMutation, // 일정 목록
    useInsertCalendarMutation, // 일정 등록
    useUpdateCalendarMutation, // 일정 수정
    useSelectCalendarMutation, // 일정 상세
    useDeleteCalendarMutation, // 일정 삭제
    useSelectMonthlyCalendarListMutation // 월간계획표 조회
} = scheduleManagement;
