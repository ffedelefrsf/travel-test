import express from 'express'
import { Feedbacks } from '../model/feedbacks.entity'
import CommonController from './common-controller'

export const routePath = 'feedbacks'
const feedbacksApi = express.Router()

CommonController(feedbacksApi, Feedbacks)

export default feedbacksApi
