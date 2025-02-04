import { IsDateString, IsEmail, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TicketStatus } from '../enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTicketDto {
    @ApiProperty({ example: 'Login Issue Edited', description: 'Updated title of the ticket' })
    @IsOptional()
    @IsString()
    title: string;

    @ApiProperty({ example: 'Unable to login to the system edited', description: 'Updated detailed description of the issue' })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ example: 'editedUser@example.com', description: 'Updated contact information of the user' })
    @IsOptional()
    contactInfo: string;

    @ApiProperty({ enum: TicketStatus, example: TicketStatus.ACCEPTED, description: 'New status of the ticket' })
    @IsOptional()
    @IsEnum(TicketStatus, { message: 'Status must be pending, accepted, resolved, or rejected' })
    status: TicketStatus;

    @ApiProperty({ example: '2024-02-05T15:00:00Z', description: 'Date the ticket was last updated', nullable: false })
    @IsOptional()
    @IsDateString()
    updatedAt: string;
}