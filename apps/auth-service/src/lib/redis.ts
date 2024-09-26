import { Redis } from 'ioredis'

const redis = new Redis({
  host: 'localhost',
  port: 6379
})

redis.on('error', err => {
  console.error('Redis connection error:', err)
  process.exit(1)
})

redis.on('connect', () => {
  console.log('Redis connected')
})

process.on('SIGINT', () => {
  redis.quit(() => {
    console.log('Redis connection closed')
    process.exit(0)
  })
})

export default redis
