import express from 'express'
import { Passengers } from '../model/passengers.entity'
import CommonController, { sendResponse } from './common-controller'
import multer from 'multer'
import { createNewPassenger, getProfilePicture } from '../services/passengers'
import { SupportedHttpStatusses } from '../enums'

export const routePath = 'passengers'
const upload = multer()

const passengersApi = express.Router()

passengersApi.post('', upload.single('file'), (req, res) => {
  createNewPassenger({ file: req.file, body: req.body })
    .then(result => {
      sendResponse(res, SupportedHttpStatusses.CREATED, result)
    })
    .catch(error => {
      sendResponse(res, SupportedHttpStatusses.INTERNAL_SERVER_ERROR, undefined, error.message)
    })
})

passengersApi.get('/:id/profilePicture', (req, res) => {
  getProfilePicture(req.params.id)
    .then(result => {
      if (result == null) { sendResponse(res, SupportedHttpStatusses.NOT_FOUND) } else { result.pipe(res) }
    })
    .catch(error => {
      sendResponse(res, SupportedHttpStatusses.INTERNAL_SERVER_ERROR, undefined, error.message)
    })
})

CommonController(passengersApi, Passengers)

export default passengersApi
