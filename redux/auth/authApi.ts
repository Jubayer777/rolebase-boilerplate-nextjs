import { apiSlice } from '@/redux/api/apiSlice';
import { Role, setLoggedInToken, setLoggedInUser } from './authSlice';

export const userSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Login
        login: builder.mutation<any, any>({
            query: data => ({
                url: '/admin/login',
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(setLoggedInToken(result.data.result.token));
                    dispatch(setLoggedInUser(result.data.result.user));
                } catch (err) {}
            },
        }),
    }),
});

export const { useLoginMutation } = userSlice;
