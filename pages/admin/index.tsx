import { setInitialLoggedInToken, setInitialLoggedInUser } from '@/redux/auth/authSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

export interface AdminPageProps {}

function Admin(props: AdminPageProps) {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(setInitialLoggedInUser());
        dispatch(setInitialLoggedInToken());
    };
    return (
        <div>
            <p> this is admin</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Admin;
