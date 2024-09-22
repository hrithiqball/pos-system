import { app } from '@app/auth-service/index'
import { describe, expect, it } from 'vitest'

describe('Rate limiting', () => {
  it('should allow the first request', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    expect(await res.text()).toBe('Auth service running')
  })

  it('should block after exceeding the rate limit', async () => {
    const clientIP = '1.1.1.1'
    for (let index = 0; index < 100; index++) {
      await app.request('/', { headers: { 'x-forwarded-for': clientIP } })
    }

    const res = await app.request('/', { headers: { 'x-forwarded-for': clientIP } })
    expect(res.status).toBe(429)
    expect(await res.text()).toBe('Rate limit exceeded')
  })
})
