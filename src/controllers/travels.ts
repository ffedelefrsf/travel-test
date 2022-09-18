import express from 'express'

export const routePath = 'travels'
const travelsApi = express.Router()

travelsApi.get('', (_req, _res) => {
  console.log('plese gimme all the travel schedule')
})

export default travelsApi
