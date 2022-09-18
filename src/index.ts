import express from 'express'
import configEnvironment, { getEnvironmentVariable } from './config'
import travelsApi, { routePath } from './controllers/flights'

configEnvironment()
  .then(() => {
    const app = express()

    const prefix = '/api'

    app.use(express.json())

    app.use(`${prefix}/${routePath}`, travelsApi)

    const port = getEnvironmentVariable('PORT') ?? 3001
    app.listen(port, () => {
      console.log(`Server successfully running on port ${port}}!!!`)
    })
  })
  .catch((error: any) => {
    console.log('error', error)
  })
