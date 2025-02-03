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

    @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.PENDING })
    status: TicketStatus;

    @Column({ default: 0 })
    order: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date | null;

    @ManyToOne(() => User, (user) => user.tickets, { eager: true })
    createdBy: User;

    @ManyToOne(() => User, { nullable: true, eager: true })
    modifiedBy: User;
}