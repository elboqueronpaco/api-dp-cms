import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 255
    })
    title!: string

    @Column({
        type: 'text',
        nullable: false
    })
    slug!: string

    @Column({
        type: 'varchar',
        length: 255
    })
    excerpt?: string

    @Column({
        type: 'text'
    })
    content!: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    category: string

    @Column({ type: 'simple-array'})
    tags: string[]

    @Column({
        type: 'bool',
        default: true
    })
    status: boolean

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp'
    })
    createAt: Date

    @UpdateDateColumn({ name: 'updated_at', type:'timestamp'})
    updatedAt: Date
}