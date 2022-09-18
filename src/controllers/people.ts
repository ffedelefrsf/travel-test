import express from 'express'
import { People } from '../model/people.entity'
import CommonController from './common-controller'

export const routePath = 'people'
const peopleApi = express.Router()

CommonController(peopleApi, People)

export default peopleApi
