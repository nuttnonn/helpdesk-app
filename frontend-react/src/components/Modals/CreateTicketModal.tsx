import React from 'react';
import TicketForm from '../forms/TicketForm.tsx';
import { Form, message, Modal } from 'antd';
import { useCreateTicket } from '../../features/tickets/ticketsAPI.ts';

interface CreateTicketModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onSuccess: () => void;
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
    isOpen,
    onCancel,
    onSuccess,
}) => {
    const [form] = Form.useForm();
    const { mutate: createTicket, isPending: isCreating, isError: isCreateError, error: createError } = useCreateTicket();

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    }

    const onFinish = async (values) => {
        createTicket(values, {
            onSuccess: () => {
                message.success("Ticket created successfully!");
                form.resetFields();
                onSuccess();
            },
            onError: (err) => {
                message.error(err.response.data.message || "Failed to create ticket.");
            }
        });
    };

    return (
        <Modal
            title={'Create Ticket'}
            centered
            open={isOpen}
            footer={null}
            onCancel={handleCancel}
            width={600}
            rootClassName="custom-modal"
        >
            <div className="w-full pt-6 pb-2 flex flex-col justify-start items-start gap-4">
                <TicketForm
                    form={form}
                    name="createTicketForm"
                    onFinish={onFinish}
                    isLoading={isCreating}
                />
            </div>
            {(isCreateError && createError) &&
                <p className="text-error text-sm">{createError.message}</p>
            }
        </Modal>
    );
};

export default CreateTicketModal;