import 'dotenv/config'

export const env = {
  DATABASE_URL: process.env.DATABASE_URL
    ? process.env.DATABASE_URL.toString()
    : () => {
        console.error('Missing DATABASE_URL environment variable')
        process.exit(1)
      },
  PORT: process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : (() => {
        console.error('Missing PORT environment variable')
        process.exit(1)
      })()
}
