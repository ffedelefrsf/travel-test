import express from 'express'
import { Planes } from '../model/planes.entity'
import CommonController from './common-controller'

export const routePath = 'planes'
const planesApi = express.Router()

CommonController(planesApi, Planes)

export default planesApi
