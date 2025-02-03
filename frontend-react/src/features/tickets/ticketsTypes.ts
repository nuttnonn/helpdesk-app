import { TicketStatus } from './enums/status.enum.ts';
import { User } from '../users/usersTypes.ts';

export interface Ticket {
    id: number;
    title: string;
    description: string;
    contactInfo: string;
    status: TicketStatus;
    order: number;
    createdAt: string;
    updatedAt: string;
    createdBy: User;
    modifiedBy?: User | null;
}

export interface CreateTicketRequest {
    title: string;
    description: string;
    contactInfo: string;
    status?: TicketStatus;
}

export interface UpdateTicketRequest {
    id: number;
    title?: string;
    description?: string;
    contactInfo?: string;
    status?: TicketStatus;
    order?: number;
}

export interface ReorderTicketRequest {
    id: number;
    status: TicketStatus;
    order: number;
    updatedAt?: string;
}
