import { Context, Next } from 'hono'
import { getCookie } from 'hono/cookie'

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization')
  const tokenFromHeader = authHeader ? authHeader.replace('Bearer ', '') : null
  const tokenFromCookie = getCookie(c, 'access_token')

  if (tokenFromHeader && tokenFromHeader === tokenFromCookie) {
    await next()
  } else {
    return c.json(
      { message: 'Unauthorized', header: tokenFromHeader, tokenFromCookie: tokenFromCookie },
      401
    )
  }
}
