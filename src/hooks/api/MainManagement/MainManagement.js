import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const mainManagement = createApi({
    reducerPath: 'mainManagement',
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
        getLoginInfo: builder.mutation({
            query: (body) => ({
                url: 'main/getLoginInfo',
                method: 'POST',
                body: body
            })
        })
    })
});

export const { useGetLoginInfoMutation } = mainManagement;
