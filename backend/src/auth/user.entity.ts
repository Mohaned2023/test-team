import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./role.enum";

@Entity({name: 'users'})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Index()
    id: number;

    @Column({unique: true, length: 50})
    username: string;

    @Column({ length: 100 })
    name: string;

    @Column({type: 'text'})
    password: string;

    @Column({type: 'text'})
    solt: string;

    @Column({ length: 100, unique: true})
    email: string;

    @Column({ length: 10, enum: UserRole, default: UserRole.USER})
    role: UserRole;

    @Column({type: 'boolean', default: true})
    gender: boolean;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    create_at: Date;
}

