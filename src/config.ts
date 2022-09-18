import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from './utils/snake-naming.strategy'

const nodeEnv: string = process.env.NODE_ENV ?? 'development'
dotenv.config({
  path: `.${nodeEnv}.env`
})

export const getEnvironmentVariable = (key: string): string | undefined => {
  return process.env[key]
}

export const dataSource = new DataSource({
  type: 'mysql',
  host: getEnvironmentVariable('DATABASE_HOST'),
  port: Number(getEnvironmentVariable('DATABASE_PORT')),
  username: getEnvironmentVariable('DATABASE_USERNAME'),
  password: getEnvironmentVariable('DATABASE_PASSWORD'),
  database: getEnvironmentVariable('DATABASE_NAME'),
  entities: ['src/model/*.entity.ts'],
  logging: getEnvironmentVariable('NODE_ENV') === 'developmenta',
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy()
})

const configEnvironment = async (): Promise<any> => {
  try {
    await dataSource
      .initialize()
      .then(() => {
        console.log('Data Source has been successfully initialized.')
      })
  } catch (err) {
    console.error('Error during Data Source initialization:', err)
    throw new Error('Error during Data Source initialization:')
  }
}

export default configEnvironment
