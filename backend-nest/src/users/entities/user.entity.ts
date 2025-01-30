import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @OneToMany(() => Ticket, (ticket) => ticket.createdBy)
    tickets: Ticket[];

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        this.password = await bcrypt.hash(this.password, 14);
    }

    @BeforeUpdate()
    async hashPasswordBeforeUpdate() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 14);
        }
    }
}
