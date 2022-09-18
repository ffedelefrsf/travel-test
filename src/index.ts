import express from 'express'
import configEnvironment, { getEnvironmentVariable } from './config'
import travelsApi, { routePath } from './controllers/travels'

configEnvironment()
const app = express()

const prefix = '/api'

app.use(express.json())

app.use(`${prefix}/${routePath}`, travelsApi)

app.listen(3000, () => {
  console.log('Server successfully running on port', getEnvironmentVariable('PORT'))
})
