import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { TicketStatus } from '../enums/status.enum';

export class ReorderTicketDto {
    @IsNotEmpty()
    @IsEnum(TicketStatus, { message: 'Status must be one of the valid ticket statuses' })
    status: TicketStatus;

    @IsNotEmpty()
    @IsNumber()
    order: number;

    @IsOptional()
    @IsDateString()
    updatedAt: string;
}