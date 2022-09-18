import express from 'express'
import { Pilots } from '../model/pilots.entity'
import CommonController from './common-controller'

export const routePath = 'pilots'
const pilotsApi = express.Router()

CommonController(pilotsApi, Pilots)

export default pilotsApi
