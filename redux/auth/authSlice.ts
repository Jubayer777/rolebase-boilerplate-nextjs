import { createSlice } from '@reduxjs/toolkit';
import { Roles, User } from '../user/userSlice';

interface AuthState {
    loggedInUser: User;
    loggedInToken: string;
}
export enum Role {
    ADMIN = 'admin',
    GUEST = 'guest',
}

export function initialRoles(id?: number): Roles {
    return {
        id: id || -1,
        title: Role.GUEST,
    };
}
export function initialUser(id?: number): User {
    return {
        id: id || -1,
        name: '',
        email: '',
        contactNo: null,
        roles: [initialRoles()],
    };
}

export const initialState: AuthState = {
    loggedInUser: initialUser(),
    loggedInToken: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload;
        },
        setLoggedInToken: (state, action) => {
            state.loggedInToken = action.payload;
        },
        setInitialLoggedInUser: state => {
            state.loggedInUser = initialUser();
        },
        setInitialLoggedInToken: state => {
            state.loggedInToken = '';
        },
    },
});

export const { setLoggedInUser, setLoggedInToken, setInitialLoggedInToken, setInitialLoggedInUser } = authSlice.actions;
