import express from 'express'
import { SupportedDestinations, SupportedHttpStatusses } from '../enums'
import { Flights } from '../model/flights.entity'
import { findAllByDestination } from '../services/flights'
import CommonController, { sendResponse } from './common-controller'

export const routePath = 'flights'
const flightsApi = express.Router()

flightsApi.get('/findAllByDestination/:destinationName', (req, res) => {
  const { destinationName } = req.params
  if (!Object.values(SupportedDestinations).includes(destinationName as SupportedDestinations)) {
    sendResponse(res, SupportedHttpStatusses.BAD_REQUEST)
  }
  findAllByDestination(destinationName as SupportedDestinations)
    .then(result => {
      if (result.length > 0) {
        sendResponse(res, SupportedHttpStatusses.OK, result)
      } else {
        sendResponse(res, SupportedHttpStatusses.NO_CONTENT)
      }
    })
    .catch(error => {
      sendResponse(res, SupportedHttpStatusses.INTERNAL_SERVER_ERROR, undefined, error.message)
    })
})

CommonController(flightsApi, Flights)

export default flightsApi
