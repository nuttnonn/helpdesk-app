import { IsDateString, IsEmail, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TicketStatus } from '../enums/status.enum';

export class UpdateTicketDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    contactInfo: string;

    @IsOptional()
    @IsEnum(TicketStatus, { message: 'Status must be pending, accepted, resolved, or rejected' })
    status: TicketStatus;

    @IsOptional()
    @IsDateString()
    updatedAt: string;
}