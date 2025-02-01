import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { email, password } = createUserDto;

        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        createUserDto.password = await bcrypt.hash(password, 14);

        const user = this.userRepository.create(createUserDto);
        await this.userRepository.save(user);
        return user;
    }

    async find(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User | null> {
        if (!id) return null;
        return this.userRepository.findOneBy({ id });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 14);
        } else {
            delete updateUserDto.password;
        }

        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }
}