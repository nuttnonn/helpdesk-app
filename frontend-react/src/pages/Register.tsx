import React from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from '../features/users/usersAPI.ts';
import FormCard from '../components/cards/FormCard.tsx';
import UserForm from '../components/forms/UserForm.tsx';
import { message } from 'antd';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { mutate: registerUser, isPending, isError, error } = useRegisterUser();

    const onFinish = async (values) => {
        await registerUser(values, {
            onSuccess: () => {
                navigate("/login");
                message.success("Registered successfully!");
            },
        });
    };

    return (
        <div className="w-screen min-h-screen px-4 flex items-center justify-center">
            <FormCard title="Register">
                <UserForm onFinish={onFinish} isLoading={isPending} />
                {(isError && error) && <p className="text-red-500 text-sm">{error.message}</p>}
                <p className="text-sm text-gray-500">
                    Already have an account?&nbsp;
                    <button
                        onClick={() => navigate("/login")}
                        className="text-primary font-semibold hover:underline"
                    >
                        Login
                    </button>
                </p>
            </FormCard>
        </div>
    );
};

export default RegisterPage;