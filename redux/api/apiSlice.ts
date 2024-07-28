import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL, // process.env.REST_API_URL,
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();

        let result: any = await baseQuery(args, api, extraOptions);

        // if (
        //     result?.error?.status === 401 &&
        //     result?.meta?.request?.url !==
        //         `http://localhost:4000/api/candidate/v1/login`
        // ) {
        //     if (!mutex.isLocked()) {
        //         const release = await mutex.acquire();

        //         try {
        //             const refreshResult = await baseQuery(
        //                 {
        //                     credentials: "include",
        //                     url: `http://localhost:4000/api/candidate/v1/refresh-token`,
        //                     method: "POST",
        //                 },
        //                 api,
        //                 extraOptions
        //             );

        //             if (refreshResult.data) {
        //                 // Retry the initial query
        //                 result = await baseQuery(args, api, extraOptions);
        //             } else {
        //                 localStorage.clear();
        //                 window.location.href = "/login";
        //             }
        //         } finally {
        //             // release must be called once the mutex should be released again.
        //             release();
        //         }
        //     } else {
        //         // wait until the mutex is available without locking it
        //         await mutex.waitForUnlock();
        //         result = await baseQuery(args, api, extraOptions);
        //     }
        // }

        return result;
    },
    tagTypes: [],
    endpoints: builder => ({}),
});
