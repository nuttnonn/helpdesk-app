import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import FormCard from '../components/cards/FormCard.tsx';
import LoginForm from '../components/forms/LoginForm.tsx';
import { LoginRequest } from '../features/auth/types/login.ts';

const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const onFinish = async (values: LoginRequest) => {
        const result = await dispatch(loginUser(values) as any);
        if (loginUser.fulfilled.match(result)) {
            navigate("/");
        }
    };

    return (
        <div className="w-screen min-h-screen flex items-center justify-center">
            <FormCard title="Login">
                <LoginForm onFinish={onFinish} isLoading={loading} />
                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                <p className="text-sm text-gray-500">
                    Don't have an account?&nbsp;
                    <button
                        onClick={() => navigate("/register")}
                        className="text-primary font-semibold hover:underline"
                    >
                        Register
                    </button>
                </p>
            </FormCard>
        </div>
    );
}

export default LoginPage;