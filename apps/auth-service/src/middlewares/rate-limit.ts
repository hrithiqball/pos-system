import { redis } from '@app/auth-service/lib/redis'
import { Context, Next } from 'hono'

export async function rateLimitMiddleware(c: Context, next: Next) {
  const clientIP = c.req.header('x-forwarded-for') || c.req.header('remote-addr') || 'unknown-ip'
  const requestLimit = 15
  const timeoutWindow = 60 * 60

  const key = `rate-limit:${clientIP}`

  const currentCount = await redis.get(key)

  if (!currentCount) {
    await redis.set(key, '1', 'EX', timeoutWindow)
  } else if (parseInt(currentCount, 10) < requestLimit) {
    await redis.incr(key)
  } else {
    return c.text('Rate limit exceeded', 429)
  }

  await next()
}
