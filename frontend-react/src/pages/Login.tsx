import React from "react";
import { Form, Input, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import FormCard from '../components/cards/FormCard.tsx';

const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const onFinish = async (values: { email: string; password: string }) => {
        const result = await dispatch(loginUser(values) as any);
        if (loginUser.fulfilled.match(result)) {
            navigate("/");
        }
    };

    return (
        <div className="w-screen min-h-screen flex items-center justify-center">
            <FormCard title="Login">
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
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </Form.Item>
                </Form>
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