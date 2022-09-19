import { Router } from 'express'
import { Multer } from 'multer'
import { Repository } from 'typeorm'
import { Passengers } from './model/passengers.entity'

interface CommonControllerProps {
  router: Router
  repository: Repository<T>
}

interface CommonResponseObject {
  success: boolean
  data: any
  message?: string
  extraMessage?: string
}

interface PassengerDTO {
  body: Omit<Passengers, 'id' | 'created_at' | 'updated_at'>
  file: Multer.File
}
