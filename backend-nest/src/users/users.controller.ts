import { Controller, Get, Param, Patch, Body, UseGuards, Req, Post, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully created' })
    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of all users' })
    @UseGuards(AuthGuard('jwt') as any)
    @Get()
    async find() {
        return this.usersService.find();
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get a single user by ID' })
    @ApiResponse({ status: 200, description: 'User details returned' })
    @UseGuards(AuthGuard('jwt') as any)
    @Get(':id')
    async findOne(@Param('id') id: number) {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }
        return this.usersService.findOne(id);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a user' })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    @UseGuards(AuthGuard('jwt') as any)
    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
}