import React, { useEffect, useState } from 'react';
import KanbanBoard from '../components/kanbanBoard/KanbanBoard.tsx';
import { Form, message, Modal } from 'antd';
import TicketForm from '../components/forms/TicketForm.tsx';
import { useCreateTicket, useFetchTicketsById, useUpdateTicket } from '../features/tickets/ticketsAPI.ts';
import { MdAdd } from 'react-icons/md';
import { Ticket } from '../features/tickets/ticketsTypes.ts';
import TicketDetailsCard from '../components/cards/TicketDetailsCard.tsx';

const HomePage = () => {
    const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket['id'] | undefined>(undefined);
    const [form] = Form.useForm();

    const { mutate: createTicket, isPending: isCreating, isError: isCreateError, error: createError } = useCreateTicket();
    const { mutate: updateTicket, isPending: isUpdating, isError: isUpdateError, error: updateError } = useUpdateTicket();
    const { data: ticketData } = useFetchTicketsById(selectedTicket);

    useEffect(() => {
        if (selectedTicket && ticketData) {
            form.setFieldsValue({
                ...ticketData
            });
        }
    }, [selectedTicket, ticketData, form]);

    const onFinish = async (values) => {
        if (!selectedTicket && !ticketData) {
            createTicket(values, {
                onSuccess: () => {
                    message.success("Ticket created successfully!");
                    form.resetFields();
                    setIsTicketModalOpen(false);
                },
                onError: (err) => {
                    message.error(err.response.data.message || "Failed to create ticket.");
                }
            });
        } else {
            updateTicket({ ...ticketData, ...values }, {
                onSuccess: () => {
                    message.success("Ticket updated successfully!");
                    form.resetFields();
                    setIsTicketModalOpen(false);
                },
                onError: (err) => {
                    message.error(err.response.data.message || "Failed to update ticket.");
                }
            });
        }
    };

    const handleModalCancel = () => {
        setIsTicketModalOpen(false);
        setSelectedTicket(undefined);
        form.resetFields();
    }

    const handleCreateTicket = () => {
        setSelectedTicket(undefined);
        form.resetFields();
        setIsTicketModalOpen(true);
    }

    const handleSelectedTicket = (ticketId: Ticket['id']) => {
        setSelectedTicket(ticketId)
        setIsTicketModalOpen(true);
    }

    return (
        <div className="w-screen min-h-screen px-8 py-32 flex flex-col justify-start items-center gap-6">
            <div className="w-full flex justify-between items-center gap-6">
                <div>

                </div>
                <button
                    onClick={handleCreateTicket}
                    className="px-6 py-3 flex justify-center items-center gap-1 bg-primary rounded-md shadow-md hover:bg-primary-dark transition"
                >
                    <MdAdd className="text-[24px]" /> Create Ticket
                </button>
            </div>
            <KanbanBoard
                setSelectedTicket={handleSelectedTicket}
            />
            <Modal
                title={selectedTicket ? `Ticket (${selectedTicket})` : 'Create Ticket'}
                centered
                open={isTicketModalOpen}
                footer={null}
                onCancel={handleModalCancel}
                width={800}
                rootClassName="custom-modal"
            >
                <div className="w-full pt-6 pb-2 flex flex-col justify-start items-start gap-4">
                    {(selectedTicket && ticketData) && <TicketDetailsCard ticket={ticketData} />}
                    <TicketForm
                        form={form}
                        ticket={ticketData ?? {}}
                        onFinish={onFinish}
                        isLoading={isCreating}
                        isUpdate={!!selectedTicket}
                    />
                </div>
                {(isCreateError || isUpdateError) && <p className="text-error text-sm">{createError?.message ?? updateError?.message}</p>}
            </Modal>
        </div>
    );
};

export default HomePage;