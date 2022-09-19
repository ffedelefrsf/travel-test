import express from 'express'
import configEnvironment, { getEnvironmentVariable } from './config'
import { sendResponse } from './controllers/common-controller'
import feedbacksApi, { routePath as feedbacksRoutePath } from './controllers/feedbacks'
import flightsApi, { routePath as flightsRoutePath } from './controllers/flights'
import passengersApi, { routePath as passengersRoutePath } from './controllers/passengers'
import peopleApi, { routePath as peopleRoutePath } from './controllers/people'
import pilotsApi, { routePath as pilotsRoutePath } from './controllers/pilots'
import planesApi, { routePath as planesRoutePath } from './controllers/planes'
import ticketsApi, { routePath as ticketsRoutePath } from './controllers/tickets'
import { SupportedHttpStatusses } from './enums'

export const prefix = '/api'

const server = configEnvironment()
  .then(() => {
    const app = express()

    app.use(express.json())

    // ROUTERS
    app.use(`${prefix}/${flightsRoutePath}`, flightsApi)
    app.use(`${prefix}/${feedbacksRoutePath}`, feedbacksApi)
    app.use(`${prefix}/${passengersRoutePath}`, passengersApi)
    app.use(`${prefix}/${peopleRoutePath}`, peopleApi)
    app.use(`${prefix}/${pilotsRoutePath}`, pilotsApi)
    app.use(`${prefix}/${planesRoutePath}`, planesApi)
    app.use(`${prefix}/${ticketsRoutePath}`, ticketsApi)
    app.use((_req, res) => {
      sendResponse(res, SupportedHttpStatusses.NOT_FOUND, undefined, 'Route not found')
    })

    const port = getEnvironmentVariable('PORT') ?? 3001
    return app.listen(port, () => {
      console.log(`Server successfully running on port ${port}}!!!`)
    })
  })
  .catch((error: any) => {
    console.log('error', error)
  })

export default server
