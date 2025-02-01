import React from 'react';
import { Form, Input } from 'antd';
import { LoginRequest } from '../../features/auth/types/login.ts';

interface LoginFormProps {
    onFinish: (values: LoginRequest) => void;
    isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onFinish, isLoading }) => {
    return (
        <Form layout="vertical" onFinish={onFinish} className="w-full">
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
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;