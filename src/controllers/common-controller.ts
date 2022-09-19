import { Response, Router } from 'express'
import { EntityTarget, FindOptionsWhereProperty, ObjectLiteral } from 'typeorm'
import { SupportedHttpStatusses } from '../enums'
import { create, findAll, findById, updateById } from '../services/common-service'
import { CommonResponseObject } from '../types'

export const defaultCommonResponseobject: CommonResponseObject = {
  success: false,
  message: 'An error occurred.',
  data: undefined
}

export const sendResponse = (res: Response, httpStatus: SupportedHttpStatusses, body?: any, extraMessage?: string): void => {
  const modifiedResponse = res.status(httpStatus)
  switch (httpStatus) {
    case SupportedHttpStatusses.OK:
      modifiedResponse.send({ ...defaultCommonResponseobject, success: true, message: '', data: body, extraMessage })
      break
    case SupportedHttpStatusses.CREATED:
      modifiedResponse.send({ ...defaultCommonResponseobject, success: true, message: '', data: body, extraMessage })
      break
    case SupportedHttpStatusses.NO_CONTENT:
      modifiedResponse.end()
      break
    case SupportedHttpStatusses.BAD_REQUEST:
      modifiedResponse.send({ ...defaultCommonResponseobject, message: 'Bad Request.', extraMessage })
      break
    case SupportedHttpStatusses.UNAUTHORIZED:
      modifiedResponse.send({ ...defaultCommonResponseobject, message: 'Unauthorized.', extraMessage })
      break
    case SupportedHttpStatusses.FORBIDDEN_RESOURCE:
      modifiedResponse.send({ ...defaultCommonResponseobject, message: 'You don\'t have permissions to acces this resource.', extraMessage })
      break
    case SupportedHttpStatusses.NOT_FOUND:
      modifiedResponse.send({ ...defaultCommonResponseobject, message: 'Not Found.', extraMessage: extraMessage ?? 'Resource not found.' })
      break
    case SupportedHttpStatusses.INTERNAL_SERVER_ERROR:
      modifiedResponse.send({ ...defaultCommonResponseobject, extraMessage })
      break
    default:
      modifiedResponse.send(defaultCommonResponseobject)
      break
  }
}

const CommonController = <Entity extends ObjectLiteral>(router: Router, target: EntityTarget<Entity>): void => {
  // GET ALL
  router.get('', (_req, res) => {
    findAll(target)
      .then(result => {
        if (result.length > 0) {
          sendResponse(res, SupportedHttpStatusses.OK, result)
        } else {
          sendResponse(res, SupportedHttpStatusses.NO_CONTENT)
        }
      })
      .catch((error: any) => {
        sendResponse(res, SupportedHttpStatusses.INTERNAL_SERVER_ERROR, undefined, error.message)
      })
  })

  // GET BY ID
  router.get('/:id', (req, res) => {
    const id: string = req.params.id
    if (id === '' || id === undefined) {
      sendResponse(res, SupportedHttpStatusses.BAD_REQUEST, undefined, 'Missing id param.')
    }
    findById(target, id as FindOptionsWhereProperty<NonNullable<Entity[string]>>)
      .then(result => {
        if (result !== undefined && result !== null) {
          sendResponse(res, SupportedHttpStatusses.OK, result)
        } else {
          sendResponse(res, SupportedHttpStatusses.NOT_FOUND)
        }
      })
      .catch((error: any) => {
        sendResponse(res, SupportedHttpStatusses.INTERNAL_SERVER_ERROR, undefined, error.message)
      })
  })

  // CREATE NEW ONE
  router.post('', (req, res) => {
    const body = req.body
    delete body.id
    create(target, body)
      .then(result => {
        if (result !== undefined && result !== null) {
          sendResponse(res, SupportedHttpStatusses.CREATED, result)
        } else {
          sendResponse(res, SupportedHttpStatusses.BAD_REQUEST, undefined)
        }
      })
      .catch((error: any) => {
        sendResponse(res, SupportedHttpStatusses.INTERNAL_SERVER_ERROR, undefined, error.message)
      })
  })

  // UPDATE BY ID
  router.put('/:id', (req, res) => {
    const { id } = req.params
    const body = req.body
    if (id === '' || id === undefined || Object.keys(body).length === 0) {
      sendResponse(res, SupportedHttpStatusses.BAD_REQUEST, undefined, 'Missing id param.')
    }
    updateById(target, id, body)
      .then(result => {
        if (result !== undefined && result !== null) {
          sendResponse(res, SupportedHttpStatusses.OK, result)
        } else {
          sendResponse(res, SupportedHttpStatusses.BAD_REQUEST, undefined)
        }
      })
      .catch((error: any) => {
        sendResponse(res, SupportedHttpStatusses.INTERNAL_SERVER_ERROR, undefined, error.message)
      })
  })
}

export default CommonController
