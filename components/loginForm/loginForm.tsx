import { useLoginMutation } from '@/redux/auth/authApi';
import { validateEmail } from '@/utils/emailValidator';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import './loginForm.scss';
export interface LoginFormProps {}

function LoginForm(props: LoginFormProps) {
    const [login, { isSuccess, isError, isLoading, error }] = useLoginMutation();
    const router = useRouter();

    const [formErrors, setFormErrors] = useState<any>({});
    const [inputData, setInputData] = useState({
        email: '',
        password: '',
    });

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        setInputData({
            ...inputData,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    }

    function validate(values: { email: string; password: string }) {
        const errors: any = {};
        if (!values.email) {
            errors.email = 'Email is required';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        }
        if (values.email) {
            const validation = validateEmail(values.email);
            if (!validation) {
                errors.email = 'Email is not valid';
            }
        }
        return errors;
    }

    function handleSignIn(e: React.SyntheticEvent) {
        e.preventDefault();
        const newErrors = validate(inputData);
        setFormErrors(newErrors);
        const isNonEmpty = !Object.values(inputData).some(x => x === null || x === '');
        if (isNonEmpty && Object.keys(newErrors).length === 0) {
            login(inputData);
        }
    }

    useEffect(() => {
        if (isSuccess) {
            router.push('/');
        }
    }, [isSuccess]);

    return (
        <div className="login-page">
            <div className="login-page__card">
                <div className="login-page__app-head">
                    <p className="login-page__app-title">VENTURE TV</p>
                </div>
                <div className="login-page__body">
                    <p className="login-page__body-title">Sign In</p>
                    <p className="login-page__body-sub-title">Please fill in this form to login!</p>
                    <form className="login-page__body-form" onSubmit={handleSignIn}>
                        <div>
                            <input
                                className="login-page__body-input-field"
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={inputData.email}
                                onInput={handleChange}
                            />
                            {formErrors.email && <p className="login-page__error">{formErrors.email}</p>}
                        </div>
                        <div>
                            <input
                                className="login-page__body-input-field"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={inputData.password}
                                onInput={handleChange}
                            />
                            {formErrors.password && <p className="login-page__error">{formErrors.password}</p>}
                        </div>
                        <button className="login-page__btn" type="submit">
                            Sign In
                        </button>
                    </form>
                </div>
                {isLoading && <p className="login-page__error">Loading...</p>}
                {error && <p className="login-page__error">{error.data.message}</p>}
            </div>
        </div>
    );
}

export default LoginForm;
