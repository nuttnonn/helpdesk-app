import { Controller, Get, Param, Patch, Body, UseGuards, Req, Post, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(AuthGuard('jwt') as any)
    @Get()
    async find() {
        return this.usersService.find();
    }

    @UseGuards(AuthGuard('jwt') as any)
    @Get(':id')
    async findOne(@Param('id') id: number) {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }
        return this.usersService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt') as any)
    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
}