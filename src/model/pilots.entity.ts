import { Column, Entity, OneToMany } from 'typeorm' // eslint-disable-line 
import { SupportedPilotsExperiences } from '../enums'
import { Flights } from './flights.entity'
import { People } from './people.entity'

@Entity()
export class Pilots extends People { // eslint-disable-line 
  @Column({ type: 'enum', enum: SupportedPilotsExperiences, nullable: false, default: SupportedPilotsExperiences.BEGINNER })
  experience: SupportedPilotsExperiences

  @OneToMany(() => Flights, flight => flight.plane, { cascade: ['insert', 'update'] })
  flights: Flights[]
}
