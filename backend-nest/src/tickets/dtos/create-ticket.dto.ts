import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TicketStatus } from '../enums/status.enum';

export class CreateTicketDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    contactInfo: string;

    @IsOptional()
    @IsEnum(TicketStatus, { message: 'Status must be pending, accepted, resolved, or rejected' })
    status: TicketStatus;

    @IsOptional()
    @IsNumber()
    order: number;
}