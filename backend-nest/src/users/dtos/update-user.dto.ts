import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'Updated name of the user', required: false })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({ example: 'john@example.com', description: 'Updated email of the user', required: false })
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'newpassword123', description: 'New password (min 6 characters)', required: false })
    @IsOptional()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}