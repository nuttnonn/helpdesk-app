import React, { useEffect } from 'react';
import { Form, FormInstance, Input, Select } from 'antd';
import { Ticket } from '../../features/tickets/ticketsTypes.ts';

type TicketFormValues = {
    title: string;
    description: string;
    contactInfo: string;
}

interface TicketFormProps {
    form: FormInstance;
    ticket?: Ticket;
    onFinish: (values: TicketFormValues) => void;
    isLoading: boolean;
    isUpdate?: boolean;
}

const TicketForm: React.FC<TicketFormProps> = ({
    form,
    ticket,
    onFinish,
    isLoading,
    isUpdate,
}) => {
    return (
        <Form
            form={form}
            name="ticketForm"
            layout="vertical"
            onFinish={onFinish}
            className="w-full"
        >
            <Form.Item
                label={<span className="form-label">Title</span>}
                name="title"
                rules={[{ required: true, message: "Please enter the title!" }]}
            >
                <Input placeholder="Enter title" size="large" allowClear />
            </Form.Item>
            <Form.Item
                label={<span className="form-label">Description</span>}
                name="description"
                rules={[{ required: true, message: "Please enter the description!" }]}
            >
                <Input.TextArea placeholder="Enter description" size="large" autoSize={{ minRows: 4 }} />
            </Form.Item>
            <Form.Item
                label={<span className="form-label">Contact Info</span>}
                name="contactInfo"
                rules={[{ required: true, message: "Please enter the contact info!" }]}
            >
                <Input.TextArea placeholder="Enter contact info" size="large" autoSize={{ minRows: 2 }} />
            </Form.Item>
            <Form.Item>
                <button type="submit" className="w-full p-3 bg-primary text-white rounded-md">
                    {isLoading ? (
                        isUpdate ? 'Updating...' : 'Creating...'
                    ) : (
                        isUpdate ? 'Update' : 'Create'
                    )}
                </button>
            </Form.Item>
        </Form>
    );
};

export default TicketForm;