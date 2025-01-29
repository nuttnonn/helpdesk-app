import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { TicketStatus } from '../enums/status.enum';

export class UpdateTicketDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsEmail()
    contactInfo: string;

    @IsOptional()
    @IsEnum(TicketStatus, { message: 'Status must be pending, accepted, resolved, or rejected' })
    status: TicketStatus;
}