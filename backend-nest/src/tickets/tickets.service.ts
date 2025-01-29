import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket) private readonly ticketRepository: Repository<Ticket>,
    ) {}

    async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
        const ticket = this.ticketRepository.create(createTicketDto);
        return this.ticketRepository.save(ticket);
    }

    async find(): Promise<Ticket[]> {
        return this.ticketRepository.find();
    }

    async findOne(id: number): Promise<Ticket> {
        if (!id) return null;
        return this.ticketRepository.findOneBy({ id });
    }

    async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
        const ticket = await this.ticketRepository.findOne({ where: { id } });
        if (!ticket) {
            throw new NotFoundException(`Ticket ${id} not found`);
        }
        Object.assign(ticket, updateTicketDto);
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