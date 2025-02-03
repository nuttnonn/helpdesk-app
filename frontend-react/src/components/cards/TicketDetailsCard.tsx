import React from 'react';
import { Ticket } from '../../features/tickets/ticketsTypes.ts';
import { formatThaiDateTime } from '../../utils/dates.ts';

interface TicketDetailsCardProps {
    ticket: Ticket;
}

const titleStyle = 'p2 !text-[14px] !font-semibold';
const valueStyle = '!font-light'

const TicketDetailsCard: React.FC<TicketDetailsCardProps> = ({ ticket }) => {
    const { status, createdBy, createdAt, modifiedBy, updatedAt } = ticket;
    const createdDate = createdAt ? formatThaiDateTime(createdAt) : null;
    const updatedDate = updatedAt ? formatThaiDateTime(updatedAt) : null;

    return (
        <div className="w-full p-3 grid grid-cols-2 gap-2 border border-border rounded-md largePhone:grid-cols-1">
            <p className={`${titleStyle} col-span-full`}>
                Status: <span className={`${valueStyle} capitalize`}>{status}</span>
            </p>
            <p className={titleStyle}>
                Created by: <span className={valueStyle}>{createdBy.name}</span>
            </p>
            <p className={titleStyle}>
                Created date: <span className={valueStyle}>{createdDate}</span>
            </p>
            <p className={titleStyle}>
                Updated by: <span className={valueStyle}>{modifiedBy ? modifiedBy.name : '-'}</span>
            </p>
            <p className={titleStyle}>
                Updated date: <span className={valueStyle}>{updatedDate ? updatedDate : '-'}</span>
            </p>
        </div>
    );
};

export default TicketDetailsCard;