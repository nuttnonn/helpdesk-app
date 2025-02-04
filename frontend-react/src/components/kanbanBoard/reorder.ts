import { TicketStatus } from '../../features/tickets/enums/status.enum.ts';
import { ReorderTicketRequest, Ticket } from '../../features/tickets/ticketsTypes.ts';
import React from 'react';

interface ReorderArgs {
    result: any;
    columns: Record<TicketStatus, Ticket[]>;
    setColumns: React.Dispatch<React.SetStateAction<Record<TicketStatus, Ticket[]>>>;
    reorderTicket: (data: ReorderTicketRequest) => void;
}

const reorder = ({ result, columns, setColumns, reorderTicket }): ReorderArgs => {
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

export default reorder;