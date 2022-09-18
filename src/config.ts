import * as dotenv from 'dotenv'

const configEnvironment = (): void => {
  const nodeEnv: string = process.env.NODE_ENV ?? 'development'
  dotenv.config({
    path: `.${nodeEnv}.env`
  })
}

export const getEnvironmentVariable = (key: string): string | undefined => {
  return process.env[key]
}

export default configEnvironment
