import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket) private readonly ticketRepository: Repository<Ticket>,
    ) {}

    async create(createTicketDto: CreateTicketDto, user: User): Promise<Ticket> {
        const ticket = this.ticketRepository.create({
            ...createTicketDto,
            createdBy: user,
        });
        return this.ticketRepository.save(ticket);
    }

    async find(): Promise<Ticket[]> {
        return this.ticketRepository.find();
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
        return this.ticketRepository.save(ticket);
    }

    async remove(id: number): Promise<{ message: string }> {
        const ticket = await this.ticketRepository.findOne({ where: { id } });
        if (!ticket) {
            throw new NotFoundException(`Ticket ${id} not found`);
        }
        throw new ForbiddenException("Ticket can not be removed");
    }
}