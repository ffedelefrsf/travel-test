import { Column, Entity, OneToMany, Unique } from 'typeorm' // eslint-disable-line 
import { Feedbacks } from './feedbacks.entity'
import { People } from './people.entity'
import { Tickets } from './tickets.entity'

@Entity()
export class Passengers extends People { // eslint-disable-line 
  @Column({ nullable: false, length: 50 })
  email: string

  @Column({ nullable: true, length: 255 })
  profilePictureName: string

  @OneToMany(() => Tickets, ticket => ticket.passenger)
  tickets: Tickets[]

  @OneToMany(() => Feedbacks, feedback => feedback.flight)
  feedbacks: Feedbacks[]
}
