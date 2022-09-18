import { Entity, Column, OneToMany } from 'typeorm' // eslint-disable-line 
import { SupportedPlaneBrands } from '../enums'
import { AbstractEntity } from './abstract.entity'
import { Flights } from './flights.entity'

@Entity()
export class Planes extends AbstractEntity { // eslint-disable-line 
  @Column({ type: 'varchar', length: 100, nullable: false })
  model: string

  @Column({ type: 'enum', enum: SupportedPlaneBrands, nullable: false })
  brand: SupportedPlaneBrands

  @Column({ type: 'tinyint', nullable: false })
  passengerCapacity: number

  @OneToMany(() => Flights, flight => flight.plane)
  flights: Flights[]
}
