import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TicketStatus } from '../enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
    @ApiProperty({ example: 'Login Issue', description: 'Title of the ticket' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: 'Unable to login to the system', description: 'Detailed description of the issue' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ example: 'user@example.com', description: 'Contact information of the user' })
    @IsNotEmpty()
    contactInfo: string;

    @ApiProperty({ enum: TicketStatus, example: TicketStatus.PENDING, description: 'Current status of the ticket' })
    @IsOptional()
    @IsEnum(TicketStatus, { message: 'Status must be pending, accepted, resolved, or rejected' })
    status: TicketStatus;

    @ApiProperty({ example: 0, description: 'Order of the ticket in the list' })
    @IsOptional()
    @IsNumber()
    order: number;
}