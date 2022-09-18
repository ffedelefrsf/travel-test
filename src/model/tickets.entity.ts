import { Entity, Column, Unique, ManyToOne } from 'typeorm' // eslint-disable-line 

import { AbstractEntity } from './abstract.entity'
import { Flights } from './flights.entity'
import { Passengers } from './passengers.entity'

@Entity()
@Unique(['traceCode'])
export class Tickets extends AbstractEntity { // eslint-disable-line 
  @Column({ type: 'int', nullable: false })
  traceCode: number

  @Column({ type: 'tinyint', nullable: false })
  seatNumber: number

  @Column({ type: 'decimal', nullable: false })
  price: number

  @Column({ default: false, nullable: false })
  hasSecure: boolean

  @ManyToOne(() => Passengers, passenger => passenger.feedbacks, { onDelete: 'CASCADE', nullable: false })
  passenger: Passengers

  @ManyToOne(() => Flights, flight => flight.tickets, { onDelete: 'CASCADE', nullable: false })
  flight: Flights
}
