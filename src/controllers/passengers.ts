import express from 'express'
import { Passengers } from '../model/passengers.entity'
import CommonController from './common-controller'

export const routePath = 'passengers'
const passengersApi = express.Router()

CommonController(passengersApi, Passengers)

export default passengersApi
