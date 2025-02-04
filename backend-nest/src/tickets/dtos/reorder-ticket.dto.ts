import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { TicketStatus } from '../enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ReorderTicketDto {
    @ApiProperty({ enum: TicketStatus, example: TicketStatus.ACCEPTED, description: 'New status of the ticket' })
    @IsNotEmpty()
    @IsEnum(TicketStatus, { message: 'Status must be one of the valid ticket statuses' })
    status: TicketStatus;

    @ApiProperty({ example: 0, description: 'Order of the ticket in the list' })
    @IsNotEmpty()
    @IsNumber()
    order: number;

    @ApiProperty({ example: '2024-02-05T15:00:00Z', description: 'Date the ticket was last updated', nullable: true })
    @IsOptional()
    @IsDateString()
    updatedAt: string;
}