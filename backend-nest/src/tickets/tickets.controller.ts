import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Post()
    async create(@Body() createTicketDto: CreateTicketDto) {
        return this.ticketsService.create(createTicketDto);
    }

    @Get()
    async find() {
        return this.ticketsService.find();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const ticket = await this.ticketsService.findOne(id);
        if (!ticket) {
            throw new NotFoundException(`Ticket ${id} not found`);
        }
        return ticket;
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateTicketDto: UpdateTicketDto) {
        return this.ticketsService.update(id, updateTicketDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.ticketsService.remove(id);
    }
}