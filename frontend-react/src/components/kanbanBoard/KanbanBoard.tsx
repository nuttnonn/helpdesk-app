import React, { useEffect, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { Spin } from "antd";
import { useFetchTickets, useReorderTicket } from '../../features/tickets/ticketsAPI';
import { Ticket } from "../../features/tickets/ticketsTypes";
import { TicketStatus } from "../../features/tickets/enums/status.enum";
import KanbanColumn from './KanbanColumn.tsx';
import TicketCard from './TicketCard.tsx';
import { LoadingOutlined } from '@ant-design/icons';

interface KanbanBoardProps {
    setSelectedTicket: (ticket: Ticket['id']) => void;
}

const statuses: TicketStatus[] = [
    TicketStatus.PENDING,
    TicketStatus.ACCEPTED,
    TicketStatus.RESOLVED,
    TicketStatus.REJECTED,
];

const KanbanBoard: React.FC<KanbanBoardProps> = ({ setSelectedTicket }) => {
    const { data: tickets, isLoading, isError } = useFetchTickets();
    const { mutate: reorderTicket } = useReorderTicket();
    const [columns, setColumns] = useState<Record<TicketStatus, Ticket[]>>(() => ({
        [TicketStatus.PENDING]: [],
        [TicketStatus.ACCEPTED]: [],
        [TicketStatus.RESOLVED]: [],
        [TicketStatus.REJECTED]: [],
    }));

    useEffect(() => {
        if (tickets) {
            setColumns((prevColumns) => {
                const updatedColumns = { ...prevColumns };

                Object.keys(updatedColumns).forEach((key) => {
                    updatedColumns[key as TicketStatus] = [];
                });

                tickets.forEach((ticket) => {
                    updatedColumns[ticket.status].push(ticket);
                });

                return updatedColumns;
            });
        }
    }, [tickets]);

    if (isLoading) return (
        <div className="flex justify-center items-center h-[50dvh]">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
    );
    if (isError || !tickets) return (
        <div className="flex justify-center items-center h-[50dvh]">
            <p className="text-red-500 text-center">Failed to load tickets</p>
        </div>
    );

    const onDragEnd = (result: any) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceColumn = source.droppableId as TicketStatus;
        const destinationColumn = destination.droppableId as TicketStatus;

        const newColumns = { ...columns };

        const [movedTicket] = newColumns[sourceColumn].splice(source.index, 1);
        newColumns[destinationColumn].splice(destination.index, 0, movedTicket);
        newColumns[destinationColumn] = newColumns[destinationColumn].map((ticket, index) => ({
            ...ticket,
            status: destinationColumn,
            order: index,
        }));

        if (sourceColumn !== destinationColumn) {
            newColumns[sourceColumn] = newColumns[sourceColumn].map((ticket, index) => ({
                ...ticket,
                order: index,
            }));
        }

        setColumns(newColumns);

        const updatedTickets = [...newColumns[sourceColumn], ...newColumns[destinationColumn]];
        updatedTickets.forEach(ticket => {
            reorderTicket({
                id: ticket.id,
                status: ticket.status,
                order: ticket.order,
                updatedAt: ticket.id === movedTicket.id && ticket.status !== movedTicket.status
                    ? new Date().toISOString()
                    : undefined,
            });
        });
    };

    const handleTicketClick = (ticketId: Ticket['id']) => {
        setSelectedTicket(ticketId);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="w-full flex gap-4 overflow-x-auto overflow-y-hidden custom-scrollbar">
                {statuses.map((status) => (
                    <KanbanColumn key={status} status={status} amount={columns[status].length}>
                        {columns[status]?.map((ticket, index) => (
                            <TicketCard
                                key={`${ticket.title}-${ticket.id}-${ticket.order}-${index}`}
                                ticket={ticket}
                                index={index}
                                onClick={handleTicketClick}
                            />
                        ))}
                    </KanbanColumn>
                ))}
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;