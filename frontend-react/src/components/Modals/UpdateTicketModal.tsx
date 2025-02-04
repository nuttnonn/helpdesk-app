import React, { useEffect } from 'react';
import TicketDetailsCard from '../cards/TicketDetailsCard.tsx';
import TicketForm from '../forms/TicketForm.tsx';
import { Form, message, Modal } from 'antd';
import { Ticket } from '../../features/tickets/ticketsTypes.ts';
import { useFetchTicketsById, useUpdateTicket } from '../../features/tickets/ticketsAPI.ts';

interface UpdateTicketModalProps {
    isOpen: boolean;
    onCancel: () => void;
    selectedTicket: Ticket['id'] | undefined;
    onSuccess: () => void;
}

const UpdateTicketModal: React.FC<UpdateTicketModalProps> = ({
    isOpen,
    onCancel,
    selectedTicket,
    onSuccess,
}) => {
    const [form] = Form.useForm();
    const { data: ticketData } = useFetchTicketsById(selectedTicket);
    const { mutate: updateTicket, isPending: isUpdating, isError: isUpdateError, error: updateError } = useUpdateTicket();

    useEffect(() => {
        if (selectedTicket && ticketData) {
            form.setFieldsValue({
                ...ticketData
            });
        }
    }, [selectedTicket, ticketData, form, isOpen]);

    const handleCancel = () => {
        onCancel();
        form.resetFields();
    }

    const onFinish = async (values) => {
        if (selectedTicket && ticketData) {
            updateTicket({ ...ticketData, ...values }, {
                onSuccess: () => {
                    message.success("Ticket updated successfully!");
                    form.resetFields();
                    onSuccess();
                },
                onError: (err) => {
                    message.error(err.response.data.message || "Failed to update ticket.");
                }
            });
        }
    };

    return (
        <Modal
            title={`Ticket (${selectedTicket})`}
            centered
            open={isOpen}
            footer={null}
            onCancel={handleCancel}
            width={800}
            rootClassName="custom-modal"
        >
            <div className="w-full pt-6 pb-2 flex flex-col justify-start items-start gap-4">
                {(selectedTicket && ticketData) && <TicketDetailsCard ticket={ticketData} />}
                <TicketForm
                    form={form}
                    name="updateTicketForm"
                    onFinish={onFinish}
                    isLoading={isUpdating}
                    isUpdate={true}
                />
            </div>
            {(isUpdateError && updateError) &&
                <p className="text-error text-sm">{updateError.message}</p>
            }
        </Modal>
    );
};

export default UpdateTicketModal;