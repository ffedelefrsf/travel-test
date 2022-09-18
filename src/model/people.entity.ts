import { Entity, Column, Unique } from 'typeorm' // eslint-disable-line 
import { SupportedIdTypes } from '../enums'
import { AbstractEntity } from './abstract.entity'

@Entity()
@Unique(['identifier', 'idType'])
export class People extends AbstractEntity { // eslint-disable-line 
  @Column({ type: 'varchar', length: 50, nullable: false })
  firstName: string

  @Column({ type: 'varchar', length: 50, nullable: false })
  lastName: string

  @Column({ nullable: false, length: 15 })
  identifier: string

  @Column({ type: 'enum', enum: SupportedIdTypes, default: SupportedIdTypes.PASSPORT, nullable: false })
  idType: SupportedIdTypes

  @Column({ nullable: false, type: 'tinyint' })
  age: number
}
