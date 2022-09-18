import { Entity, Column, Unique, ManyToOne } from 'typeorm' // eslint-disable-line 
import { AbstractEntity } from './abstract.entity'
import { Flights } from './flights.entity'
import { Passengers } from './passengers.entity'

@Entity()
export class Feedbacks extends AbstractEntity { // eslint-disable-line 
  @Column({ type: 'int', nullable: false })
  traceCode: number

  @Column({ type: 'tinyint', nullable: false })
  rate: number

  @Column({ type: 'longtext', nullable: true })
  comment: string

  @ManyToOne(() => Flights, flight => flight.feedbacks, { onDelete: 'CASCADE', nullable: false })
  flight: Flights

  @ManyToOne(() => Passengers, passenger => passenger.feedbacks, { onDelete: 'CASCADE', nullable: false })
  passenger: Passengers
}
