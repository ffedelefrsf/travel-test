import express from 'express'
import { dataSource } from '../config'
import { Flights } from '../model/flights.entity'

export const routePath = 'flights'
const flightsApi = express.Router()

flightsApi.get('', (_req, _res) => {
  dataSource.getRepository(Flights).find()
    .then(result => console.log('result', result))
    .catch((error: any) => {
      console.log(error)
      // throw new Error(`An error occurred.\n${error.message}`)
    })
})

export default flightsApi
