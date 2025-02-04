import React, { useEffect, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useFetchTickets, useReorderTicket, } from '../../features/tickets/ticketsAPI';
import { Ticket } from "../../features/tickets/ticketsTypes";
import { TicketStatus } from "../../features/tickets/enums/status.enum";
import KanbanColumn from './KanbanColumn.tsx';
import TicketCard from './TicketCard.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import reorder from './reorder.ts';
import Loading from '../elements/Loading.tsx';
import Error from '../elements/Error.tsx';
import UpdateTicketModal from '../Modals/UpdateTicketModal.tsx';

const statuses: TicketStatus[] = [
    TicketStatus.PENDING,
    TicketStatus.ACCEPTED,
    TicketStatus.RESOLVED,
    TicketStatus.REJECTED,
];

const KanbanBoard = () => {
    const searchQuery = useSelector((state: RootState) => state.searchTicket.query);
    const selectedStatuses = useSelector((state: RootState) => state.searchStatus.statuses);

    const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
    const [columns, setColumns] = useState<Record<TicketStatus, Ticket[]>>(() => ({
        [TicketStatus.PENDING]: [],
        [TicketStatus.ACCEPTED]: [],
        [TicketStatus.RESOLVED]: [],
        [TicketStatus.REJECTED]: [],
    }));
    const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket['id'] | undefined>(undefined);

    const { data: tickets, isLoading, isError } = useFetchTickets();
    const { mutate: reorderTicket } = useReorderTicket();

    useEffect(() => {
        if (tickets) {
            const matchedTickets = tickets.filter(ticket =>
                ticket.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredTickets(matchedTickets);
        }
    }, [tickets, searchQuery]);

    useEffect(() => {
        if (filteredTickets) {
            setColumns((prevColumns) => {
                const updatedColumns = { ...prevColumns };

                Object.keys(updatedColumns).forEach((key) => {
                    updatedColumns[key as TicketStatus] = [];
                });

                filteredTickets.forEach((ticket) => {
                    updatedColumns[ticket.status].push(ticket);
                });

                return updatedColumns;
            });
        }
    }, [filteredTickets]);

    if (isLoading) return <Loading />;
    if (isError) return <Error message="Failed to load tickets" />;

    const handleSelectedTicket = (ticketId: Ticket['id']) => {
        setSelectedTicket(ticketId)
        setIsTicketModalOpen(true);
    }

    const handleModalCancel = () => {
        setIsTicketModalOpen(false);
        setSelectedTicket(undefined);
    }

    const handleUpdatedTicketSuccess = () => {
        setIsTicketModalOpen(false);
        setSelectedTicket(undefined);
    }

    return (
        <DragDropContext
            onDragEnd={(result) =>
                reorder({ result, columns, setColumns, reorderTicket })
            }
        >
            <div className="w-full p-2 flex items-stretch gap-4 rounded-lg border border-border overflow-x-auto overflow-y-hidden custom-scrollbar">
                {statuses.map((status) =>
                    selectedStatuses.length === 0 || selectedStatuses.includes(status) ? (
                        <KanbanColumn key={status} status={status} amount={columns[status].length}>
                            {columns[status]?.map((ticket, index) => (
                                <TicketCard
                                    key={`${ticket.title}-${ticket.id}-${ticket.order}-${index}`}
                                    ticket={ticket}
                                    index={index}
                                    onClick={() => handleSelectedTicket(ticket.id)}
                                />
                            ))}
                        </KanbanColumn>
                    ) : null
                )}
            </div>
            <UpdateTicketModal
                isOpen={isTicketModalOpen}
                onCancel={handleModalCancel}
                selectedTicket={selectedTicket}
                onSuccess={handleUpdatedTicketSuccess}
            />
        </DragDropContext>
    );
};

export default KanbanBoard;