import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const loginManagement = createApi({
    reducerPath: 'loginManagement',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`
    }),
    endpoints: (builder) => ({
        //로그인
        login: builder.mutation({
            query: (body) => ({
                url: 'adm/login.do',
                method: 'POST',
                body: body
            })
        })
    })
});

export const { useLoginMutation } = loginManagement;
