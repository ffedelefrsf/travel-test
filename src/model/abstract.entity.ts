import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm' // eslint-disable-line 

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date
}
