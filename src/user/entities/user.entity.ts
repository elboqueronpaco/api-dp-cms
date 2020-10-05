import { hash } from "bcryptjs";
import crypto, { createHash } from 'crypto'
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 255})
    name: string

    @Column({ name:'last_name', type: 'varchar', length: 255})
    lastName: string

    @Column({ name: 'username', type: 'varchar', length: 255, unique: true, nullable: false})
    userName: string

    @Column({type: 'varchar', length: 255, nullable: false, unique: true })
    email: string

    @Column({type: 'varchar', length: 255, nullable: false, select: false})
    password: string

    @Column({ type: 'varchar', length: 255})
    avatar: string

    @Column({ type: 'bool', default: true})
    status: boolean

    @CreateDateColumn({ name: 'created_at', type: 'timestamp'})
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at', type:'timestamp'})
    updatedAt: Date

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!this.password) {
            return
        }
        this.password = await hash(this.password, 10)
        
    }
    @BeforeInsert()
    @BeforeUpdate()
    async generateAvatar() {
        const createavatar = await createHash('md5').update(this.avatar).digest('hex')
        if(!this.avatar) {
            return
        }
        this.avatar = `https://gravatar.com/avatar/${createavatar}`
    }


}
