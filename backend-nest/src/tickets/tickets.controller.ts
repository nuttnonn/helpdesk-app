import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { Ticket } from './entities/ticket.entity';
import { ReorderTicketDto } from './dtos/reorder-ticket.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tickets')
@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @ApiOperation({ summary: 'Create a new ticket' })
    @ApiResponse({ status: 201, description: 'Ticket successfully created', type: Ticket })
    @UseGuards(AuthGuard('jwt') as any)
    @Post()
    async create(@Body() createTicketDto: CreateTicketDto, @Req() req) {
        const ticket = await this.ticketsService.create(createTicketDto, req.user);
        return plainToInstance(Ticket, ticket);
    }

    @ApiOperation({ summary: 'Get all tickets' })
    @ApiResponse({ status: 200, description: 'List of tickets', type: [Ticket] })
    @UseGuards(AuthGuard('jwt') as any)
    @Get()
    async find() {
        const tickets = await this.ticketsService.find();
        return plainToInstance(Ticket, tickets);
    }

    @ApiOperation({ summary: 'Get a single ticket by ID' })
    @ApiResponse({ status: 200, description: 'Ticket details', type: Ticket })
    @UseGuards(AuthGuard('jwt') as any)
    @Get(':id')
    async findOne(@Param('id') id: number) {
        const ticket = await this.ticketsService.findOne(id);
        if (!ticket) {
            throw new NotFoundException(`Ticket ${id} not found`);
        }
        return plainToInstance(Ticket, ticket);
    }

    @ApiOperation({ summary: 'Update a ticket' })
    @ApiResponse({ status: 200, description: 'Ticket updated', type: Ticket })
    @UseGuards(AuthGuard('jwt') as any)
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() updateTicketDto: UpdateTicketDto,
        @Req() req
    ) {
        const ticket = await this.ticketsService.update(id, updateTicketDto, req.user);
        return plainToInstance(Ticket, ticket);
    }

    @ApiOperation({ summary: 'Remove a ticket' })
    @ApiResponse({ status: 403, description: 'Ticket can not be remove' })
    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.ticketsService.remove(id);
    }

    @ApiOperation({ summary: 'Reorder a ticket' })
    @ApiResponse({ status: 200, description: 'Ticket reordered' })
    @UseGuards(AuthGuard('jwt') as any)
    @Patch('/reorder/:id')
    async reorder(
        @Param('id', ParseIntPipe) id: number,
        @Body() reorderTicketDto: ReorderTicketDto,
        @Req() req,
    ) {
        const ticket = await this.ticketsService.reorderTicket(id, reorderTicketDto, req.user);
        return plainToInstance(Ticket, ticket);
    }
}