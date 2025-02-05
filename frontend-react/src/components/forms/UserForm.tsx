import React from 'react';
import { Form, Input } from 'antd';

type UserFormValues = {
    name: string;
    email: string;
    password?: string;
};

interface UserFormProps {
    user?: UserFormValues;
    onFinish: (values: UserFormValues) => void;
    isLoading: boolean;
    passwordRequired?: boolean;
    isUpdate?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
    user,
    onFinish,
    isLoading,
    passwordRequired = true,
    isUpdate,
}) => {
    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
            className="w-full"
            initialValues={user}
        >
            <Form.Item
                label={<span className="form-label">Name</span>}
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
            >
                <Input placeholder="Enter your name" size="large" allowClear />
            </Form.Item>
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
                    { required: passwordRequired, message: "Please enter your password!" },
                    { min: 6, message: "Password must be at least 6 characters long" },
                ]}
            >
                <Input.Password placeholder="Enter your password" size="large" />
            </Form.Item>
            <Form.Item>
                <button type="submit" className="w-full p-3 whitespace-nowrap bg-primary border border-primary rounded-md shadow-md ease-in-out duration-300 hover:bg-secondary hover:border-secondary">
                    {isLoading ? (
                        isUpdate ? 'Updating...' : 'Registering...'
                    ) : (
                        isUpdate ? 'Update' : 'Register'
                    )}
                </button>
            </Form.Item>
        </Form>
    );
};

export default UserForm;