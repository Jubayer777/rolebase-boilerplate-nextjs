import { apiSlice } from './api/apiSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';

export const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
});
