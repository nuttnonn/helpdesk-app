import React from "react";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from '../features/users/userAPI.ts';
import FormCard from '../components/cards/FormCard.tsx';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { mutate: registerUser, isPending, isError, error } = useRegisterUser();

    const onFinish = async (values: { name: string; email: string; password: string }) => {
        await registerUser(values, {
            onSuccess: () => {
                navigate("/login");
            },
        });
    };

    return (
        <div className="w-screen min-h-screen flex items-center justify-center">
            <FormCard title="Register">
                <Form layout="vertical" onFinish={onFinish} className="w-full">
                    <Form.Item
                        label={<span className="text-textPrimary font-semibold">Name</span>}
                        name="name"
                        rules={[{ required: true, message: "Please enter your name!" }]}
                    >
                        <Input placeholder="Enter your name" size="large" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-textPrimary font-semibold">Email</span>}
                        name="email"
                        rules={[{ required: true, message: "Please enter your email!" }]}
                    >
                        <Input type="email" placeholder="Enter your email" size="large" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-textPrimary font-semibold">Password</span>}
                        name="password"
                        rules={[
                            { required: true, message: "Please enter your password!" },
                            { min: 6, message: "Password must be at least 6 characters long" },
                        ]}
                    >
                        <Input.Password placeholder="Enter your password" size="large" />
                    </Form.Item>
                    <Form.Item>
                        <button type="submit" className="w-full mt-4 p-2 bg-primary text-white rounded-md">
                            {isPending ? "Registering..." : "Register"}
                        </button>
                    </Form.Item>
                </Form>
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