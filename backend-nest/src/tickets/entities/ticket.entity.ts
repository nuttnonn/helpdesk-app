import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TicketStatus } from '../enums/status.enum';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column()
    contactInfo: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.PENDING })
    status: TicketStatus;

    @ManyToOne(() => User, (user) => user.tickets, { eager: true })
    createdBy: User;

    @ManyToOne(() => User, { nullable: true, eager: true })
    modifiedBy: User;
}