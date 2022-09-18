import { dataSource } from '../config'
import { SupportedDestinations } from '../enums'
import { Flights } from '../model/flights.entity'

const ownRepository = dataSource.getRepository(Flights)

export const findAllByDestination = async (destinationName: SupportedDestinations): Promise<Flights[]> => {
  return await ownRepository.find({ where: { destination: destinationName } })
}
