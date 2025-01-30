import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException, UseGuards, Req } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { Ticket } from './entities/ticket.entity';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @UseGuards(AuthGuard('jwt') as any)
    @Post()
    async create(@Body() createTicketDto: CreateTicketDto, @Req() req) {
        return this.ticketsService.create(createTicketDto, req.user);
    }

    @Get()
    async find() {
        const tickets = await this.ticketsService.find();
        return plainToInstance(Ticket, tickets);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const ticket = await this.ticketsService.findOne(id);
        if (!ticket) {
            throw new NotFoundException(`Ticket ${id} not found`);
        }
        return plainToInstance(Ticket, ticket);
    }

    @UseGuards(AuthGuard('jwt') as any)
    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateTicketDto: UpdateTicketDto, @Req() req) {
        const ticket = await this.ticketsService.update(id, updateTicketDto, req.user);
        return plainToInstance(Ticket, ticket);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.ticketsService.remove(id);
    }
}