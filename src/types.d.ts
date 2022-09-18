import { Router } from 'express'
import { Repository } from 'typeorm'

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
