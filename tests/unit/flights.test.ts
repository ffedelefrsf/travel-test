import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import { Repository, UpdateResult } from 'typeorm'

import server, { prefix } from '../../src'
import { dataSource } from '../../src/config'
import { defaultCommonResponseobject } from '../../src/controllers/common-controller'
import { routePath } from '../../src/controllers/flights'
import { SupportedDestinations, SupportedFlightStatus, SupportedHttpStatusses, SupportedIdTypes, SupportedPilotsExperiences, SupportedPlaneBrands } from '../../src/enums'
import { Flights } from '../../src/model/flights.entity'

chai.use(chaiHttp)

const sandbox = sinon.createSandbox()

const mockedFlights: any[] = [
  {
    id: '63c64f2a-0c82-4be1-979c-4c864400e186',
    createdAt: '2022-09-19T00:40:57.088Z',
    updatedAt: '2022-09-19T00:40:57.088Z',
    flightCode: 'DUB001',
    date: '2022-09-19T00:40:57.088Z',
    destination: SupportedDestinations.DUBAI,
    status: SupportedFlightStatus.ARRIVED,
    plane: {
      id: '52b8cc72-757c-4d3a-a12f-4167fb8ee8c8',
      createdAt: '2022-09-19T00:40:57.088Z',
      updatedAt: '2022-09-19T00:40:57.088Z',
      model: '737 Next Generation',
      brand: SupportedPlaneBrands.AIRBUS,
      passengerCapacity: 75,
      flights: []
    },
    pilot: {
      id: '23911da0-f3ad-4fec-88d0-4976b9ac585a',
      createdAt: '2022-09-19T00:40:57.088Z',
      updatedAt: '2022-09-19T00:40:57.088Z',
      firstName: 'Miguel Ángel',
      lastName: 'Fedele',
      identifier: '17995934',
      idType: SupportedIdTypes.OTHER_ID,
      age: 56,
      experience: SupportedPilotsExperiences.ADVANCED,
      flights: []
    },
    tickets: [],
    feedbacks: []
  },
  {
    id: '52b8cc72-757c-4d3a-a12f-4167fb8ee8c1',
    createdAt: '2022-09-19T00:40:57.088Z',
    updatedAt: '2022-09-19T00:40:57.088Z',
    flightCode: 'DUB001',
    date: '2022-09-19T00:40:57.088Z',
    destination: SupportedDestinations.DUBAI,
    status: SupportedFlightStatus.PENDING,
    plane: {
      id: '52b8cc72-757c-4d3a-a12f-4167fb8ee8c3',
      createdAt: '2022-09-19T00:40:57.088Z',
      updatedAt: '2022-09-19T00:40:57.088Z',
      model: '737 Next Generation',
      brand: SupportedPlaneBrands.AIRBUS,
      passengerCapacity: 75,
      flights: []
    },
    pilot: {
      id: '23911da0-f3ad-4fec-88d0-4976b9ac585b',
      createdAt: '2022-09-19T00:40:57.088Z',
      updatedAt: '2022-09-19T00:40:57.088Z',
      firstName: 'Miguel Ángel',
      lastName: 'Fedele',
      identifier: '17995934',
      idType: SupportedIdTypes.OTHER_ID,
      age: 56,
      experience: SupportedPilotsExperiences.ADVANCED,
      flights: []
    },
    tickets: [],
    feedbacks: []
  }
]

describe('Flights API Unit Tests', () => {
  let syncServer: any
  let repository: Repository<Flights>

  before(async () => {
    // TO DO -> Remove Database connection
    syncServer = await server
    repository = dataSource.getRepository(Flights)
  })

  afterEach(() => {
    sandbox.restore()
  })

  // GET All Test
  describe('Get all flights', () => {
    it('it should retrieve all the flights', async () => {
      sandbox.stub(repository, 'find').resolves(mockedFlights)
      const response = await chai.request(syncServer)
        .get(`${prefix}/${routePath}`)
      expect(response).to.have.status(SupportedHttpStatusses.OK)
      expect(response.body).to.deep.equal({ ...defaultCommonResponseobject, success: true, message: '', data: mockedFlights })
    })

    it('it should retrieve no flights', async () => {
      sandbox.stub(repository, 'find').resolves([])
      const response = await chai.request(syncServer)
        .get(`${prefix}/${routePath}`)
      expect(response).to.have.status(SupportedHttpStatusses.NO_CONTENT)
      expect(response.body).to.deep.equal({})
    })
  })

  // GET By Id Test
  describe('Get flight by id', () => {
    it('it should retrieve the specific flight', async () => {
      const aFlight: Flights = mockedFlights[0]
      sandbox.stub(repository, 'findOne').resolves(aFlight)
      const response = await chai.request(syncServer)
        .get(`${prefix}/${routePath}/${aFlight.id}`)
      expect(response).to.have.status(SupportedHttpStatusses.OK)
      expect(response.body).to.deep.equal({ ...defaultCommonResponseobject, success: true, message: '', data: aFlight })
    })

    it('it should NOT retrieve the specific flight', async () => {
      const wrongId: string = new Date().toISOString()
      sandbox.stub(repository, 'findOne').resolves(null)
      const response = await chai.request(syncServer)
        .get(`${prefix}/${routePath}/${wrongId}`)
      expect(response).to.have.status(SupportedHttpStatusses.NOT_FOUND)
      expect(response.body).to.deep.equal({ success: false, message: 'Not Found.', extraMessage: 'Resource not found.' })
    })
  })

  // Update By Id Test
  describe('Update flight by id', () => {
    it('it should update the specific flight', async () => {
      const aFlight: Flights = mockedFlights[0]
      const updateResult: UpdateResult = { generatedMaps: [], raw: {} }
      sandbox.stub(repository, 'findOne').resolves(aFlight)
      sandbox.stub(repository, 'update').resolves(updateResult)
      const response = await chai.request(syncServer)
        .put(`${prefix}/${routePath}/${aFlight.id}`)
        .send({ ...aFlight, flightCode: aFlight.flightCode.substring(1) })
      expect(response).to.have.status(SupportedHttpStatusses.OK)
      expect(response.body.success).to.equal(true)
      expect(response.body.data).to.deep.equal(updateResult)
    })

    it('it should update the specific flight because of bad request', async () => {
      const aFlight: Flights = mockedFlights[0]
      const updateResult: UpdateResult = { generatedMaps: [], raw: {} }
      sandbox.stub(repository, 'findOne').resolves(aFlight)
      sandbox.stub(repository, 'update').resolves(updateResult)
      const response = await chai.request(syncServer)
        .put(`${prefix}/${routePath}/${aFlight.id}`)
      expect(response).to.have.status(SupportedHttpStatusses.BAD_REQUEST)
      expect(response.body.success).to.equal(false)
      expect(response.body.data).to.equal(undefined)
    })

    it('it should NOT update the specific flight', async () => {
      const wrongId: string = new Date().toISOString()
      sandbox.stub(repository, 'findOne').resolves(null)
      const response = await chai.request(syncServer)
        .get(`${prefix}/${routePath}/${wrongId}`)
      expect(response).to.have.status(SupportedHttpStatusses.NOT_FOUND)
      expect(response.body.success).to.equal(false)
      expect(response.body.data).to.equal(undefined)
    })
  })

  // Create New Flight Test
  describe('Create new flight', () => {
    it('it should create a new flight', async () => {
      const aFlight: Flights = mockedFlights[0]
      sandbox.stub(repository, 'save').resolves(aFlight)
      const response = await chai.request(syncServer)
        .post(`${prefix}/${routePath}`)
        .send(aFlight)
      expect(response).to.have.status(SupportedHttpStatusses.CREATED)
      expect(response.body).to.deep.equal({ ...defaultCommonResponseobject, success: true, message: '', data: aFlight })
    })

    it('it should NOT create a new flight', async () => {
      const aFlight: Flights = mockedFlights[0]
      sandbox.stub(repository, 'save').resolves(undefined)
      const response = await chai.request(syncServer)
        .post(`${prefix}/${routePath}`)
        .send(aFlight)
      expect(response).to.have.status(SupportedHttpStatusses.BAD_REQUEST)
      expect(response.body.success).to.equal(false)
      expect(response.body.data).to.equal(undefined)
    })

    it('it should NOT create a new flight', async () => {
      const aFlight: Flights = mockedFlights[0]
      sandbox.stub(repository, 'save').callsFake(() => { throw new Error() })
      const response = await chai.request(syncServer)
        .post(`${prefix}/${routePath}`)
        .send(aFlight)
      expect(response).to.have.status(SupportedHttpStatusses.INTERNAL_SERVER_ERROR)
      expect(response.body.success).to.equal(false)
      expect(response.body.data).to.equal(undefined)
    })
  })
})
