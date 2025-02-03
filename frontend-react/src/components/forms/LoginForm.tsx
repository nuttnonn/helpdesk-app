import React from 'react';
import { Form, Input } from 'antd';
import { LoginRequest } from '../../features/auth/authTypes.ts';

interface LoginFormProps {
    onFinish: (values: LoginRequest) => void;
    isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onFinish, isLoading }) => {
    return (
        <Form layout="vertical" onFinish={onFinish} className="w-full">
            <Form.Item
                label={<span className="form-label">Email</span>}
                name="email"
                rules={[{ required: true, message: "Please enter your email!" }]}
            >
                <Input type="email" placeholder="Enter your email" size="large" allowClear />
            </Form.Item>
            <Form.Item
                label={<span className="form-label">Password</span>}
                name="password"
                rules={[
                    { required: true, message: "Please enter your password!" },
                    { min: 6, message: "Password must be at least 6 characters long" },
                ]}
            >
                <Input.Password placeholder="Enter your password" size="large" />
            </Form.Item>
            <Form.Item>
                <button type="submit" className="w-full p-3 bg-primary text-white rounded-md">
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;