import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';
import { User } from '../users/entities/user.entity';
import { TicketStatus } from './enums/status.enum';
import { ReorderTicketDto } from './dtos/reorder-ticket.dto';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket) private readonly ticketRepository: Repository<Ticket>,
    ) {}

    async create(createTicketDto: CreateTicketDto, user: User): Promise<Ticket> {
        const status = TicketStatus.PENDING;

        const maxOrderResult = await this.ticketRepository
        .createQueryBuilder('ticket')
        .where('ticket.status = :status', { status })
        .select('MAX(ticket.order)', 'max')
        .getRawOne();

        const nextOrder = maxOrderResult?.max !== null ? Number(maxOrderResult.max) + 1 : 0;

        const ticket = this.ticketRepository.create({
            ...createTicketDto,
            status,
            order: nextOrder,
            createdBy: user,
        });

        return this.ticketRepository.save(ticket);
    }

    async find(): Promise<Ticket[]> {
        return this.ticketRepository.find({
            order: { status: 'ASC', order: 'ASC' },
        });
    }

    async findOne(id: number): Promise<Ticket> {
        if (!id) return null;
        return this.ticketRepository.findOneBy({ id });
    }

    async update(id: number, updateTicketDto: UpdateTicketDto, user: User): Promise<Ticket> {
        const ticket = await this.ticketRepository.findOne({ where: { id } });
        if (!ticket) {
            throw new NotFoundException(`Ticket ${id} not found`);
        }

        Object.assign(ticket, updateTicketDto);
        ticket.modifiedBy = user;

        if (updateTicketDto.updatedAt) {
            ticket.updatedAt = new Date(updateTicketDto.updatedAt);
        }

        return this.ticketRepository.save(ticket);
    }

    async remove(id: number): Promise<{ message: string }> {
        const ticket = await this.ticketRepository.findOne({ where: { id } });
        if (!ticket) {
            throw new NotFoundException(`Ticket ${id} not found`);
        }
        throw new ForbiddenException("Ticket can not be removed");
    }

    async reorderTicket(id: number, reorderTicketDto: ReorderTicketDto, user: User): Promise<Ticket> {
        const ticket = await this.ticketRepository.findOne({ where: { id } });
        if (!ticket) {
            throw new NotFoundException(`Ticket ${id} not found`);
        }

        const updateData: Partial<Ticket> = {
            status: reorderTicketDto.status,
            order: reorderTicketDto.order,
        };

        if (reorderTicketDto.updatedAt) {
            updateData.updatedAt = new Date(reorderTicketDto.updatedAt);
            updateData.modifiedBy = user;
        }

        await this.ticketRepository.update(id, { ...updateData });

        return this.ticketRepository.findOne({ where: { id } });
    }
}