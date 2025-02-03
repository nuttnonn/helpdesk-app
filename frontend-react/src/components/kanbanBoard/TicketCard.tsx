import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Ticket } from '../../features/tickets/ticketsTypes.ts';
import { formatThaiDateTime } from '../../utils/dates.ts';
import { MdOutlineEdit } from 'react-icons/md';

interface TicketCardProps {
    ticket: Ticket;
    index: number;
    onClick: (id: Ticket['id']) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, index, onClick }) => {
    const { id, createdBy, createdAt } = ticket;
    const creatorName = createdBy.name;
    const createdDate = formatThaiDateTime(createdAt);

    const handleClick = () => {
        onClick(id);
    }

    return (
        <Draggable
            draggableId={ticket.id.toString()}
            index={index}
        >
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="w-full min-h-32 p-3 relative flex flex-col justify-between items-start bg-black/[0.4] rounded-[4px] shadow-sm backdrop-blur-sm cursor-pointer ease-in-out duration-300 hover:bg-primary/[0.4]"
                >
                    <button
                        type="button"
                        draggable={false}
                        onClick={handleClick}
                        className="pr-8 text-start group"
                    >
                        <p className="line-clamp-2 underline-offset-[2px] group-hover:underline">{ticket.title}</p>
                        <MdOutlineEdit
                            className="absolute top-0 right-0 -translate-x-4 translate-y-3.5 text-[20px] opacity-0 ease-in-out duration-300 group-hover:opacity-100"
                        />
                    </button>
                    <div className="flex flex-col justify-end items-start gap-1">
                        <p className="p2">
                            <span className="font-semibold">Created by:</span> {creatorName}
                        </p>
                        <p className="p2">
                            <span className="font-semibold">Created date:</span> {createdDate}
                        </p>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TicketCard;