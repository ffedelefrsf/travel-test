import { Entity, Column, Unique, OneToMany, ManyToOne } from 'typeorm' // eslint-disable-line 

import { SupportedDestinations, SupportedFlightStatus } from '../enums'
import { AbstractEntity } from './abstract.entity'
import { Feedbacks } from './feedbacks.entity'
import { Pilots } from './pilots.entity'
import { Planes } from './planes.entity'
import { Tickets } from './tickets.entity'

@Entity()
@Unique(['flightCode'])
export class Flights extends AbstractEntity { // eslint-disable-line 
  @Column({ type: 'varchar', length: 10, nullable: false })
  flightCode: string

  @Column({ type: 'timestamp', nullable: false, default: () => '(CURRENT_TIMESTAMP)' })
  date: Date

  @Column({ type: 'enum', enum: SupportedDestinations, nullable: false })
  destination: SupportedDestinations

  @Column({ type: 'enum', enum: SupportedFlightStatus, default: SupportedFlightStatus.PENDING, nullable: false })
  status: SupportedFlightStatus

  @ManyToOne(() => Planes, plane => plane.flights, { onDelete: 'CASCADE', nullable: false })
  plane: Planes

  @ManyToOne(() => Pilots, pilot => pilot.flights, { onDelete: 'CASCADE', nullable: false })
  pilot: Pilots

  @OneToMany(() => Tickets, ticket => ticket.flight)
  tickets: Tickets[]

  @OneToMany(() => Feedbacks, feedback => feedback.flight)
  feedbacks: Feedbacks[]
}
