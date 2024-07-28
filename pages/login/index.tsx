import LoginForm from '@/components/loginForm/loginForm';
import React from 'react';

export interface LoginPageProps {}

function Login(props: LoginPageProps) {
    return (
        <div>
            <LoginForm />
        </div>
    );
}

export default Login;
