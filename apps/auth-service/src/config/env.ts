import 'dotenv/config'

export const env = {
  DATABASE_URL: process.env.DATABASE_URL
    ? process.env.DATABASE_URL.toString()
    : () => {
        console.error('Missing DATABASE_URL environment variable')
        process.exit(1)
      },
  SECRET: process.env.SECRET
    ? process.env.SECRET.toString()
    : (() => {
        console.error('Missing SECRET environment variable')
        process.exit(1)
      })(),
  PORT: process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : (() => {
        console.error('Missing PORT environment variable')
        process.exit(1)
      })(),
  REDIS_HOST: process.env.REDIS_HOST
    ? process.env.REDIS_HOST.toString()
    : (() => {
        console.error('Missing REDIS_HOST environment variable')
        process.exit(1)
      })(),
  REDIS_PORT: process.env.REDIS_PORT
    ? parseInt(process.env.REDIS_PORT, 10)
    : (() => {
        console.error('Missing REDIS_PORT environment variable')
        process.exit(1)
      })()
}
