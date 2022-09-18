import express from 'express'
import { Tickets } from '../model/tickets.entity'
import CommonController from './common-controller'

export const routePath = 'tickets'
const ticketsApi = express.Router()

CommonController(ticketsApi, Tickets)

export default ticketsApi
