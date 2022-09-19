import fs, { promises } from 'fs'
import path from 'path'

import { dataSource } from '../config'
import { Passengers } from '../model/passengers.entity'
import { PassengerDTO } from '../types'
import { findById } from './common-service'

// const ownRepository = dataSource.getRepository(Passengers)
const profilePicturesBasePath = path.join(__dirname, '../../profilePictures')

export const createNewPassenger = async (passengerDTO: PassengerDTO): Promise<Passengers> => {
  return await dataSource.transaction(async (transactionalEntityManager) => {
    const transactionRepository = transactionalEntityManager.getRepository(Passengers)
    const passengerToCreate = passengerDTO.body
    const createdPassenger = await transactionRepository.save(passengerToCreate)
    if (passengerDTO.file !== undefined) {
      const mimeType: string = passengerDTO.file.mimetype as string
      const profilePictureName = `${createdPassenger.id}.${mimeType.substring(mimeType.indexOf('/') + 1)}`
      const profilePictureURL = path.join(profilePicturesBasePath, `/${profilePictureName}`)
      await promises.writeFile(profilePictureURL, passengerDTO.file.buffer)
      await transactionRepository.update(createdPassenger.id, { profilePictureName })
      createdPassenger.profilePictureName = profilePictureName
    }
    return createdPassenger
  })
}

export const getProfilePicture = async (passengerId: string): Promise<fs.ReadStream | undefined> => {
  const passenger = await findById(Passengers, passengerId)
  if ((passenger == null) || passenger.profilePictureName === null) {
    return undefined
  }
  //   TO DO: Handle error
  //   readStream.on('error', function (err) {
  //     console.log(err)
  //   })
  return fs.createReadStream(`${profilePicturesBasePath}/${passenger.profilePictureName}`)
}
