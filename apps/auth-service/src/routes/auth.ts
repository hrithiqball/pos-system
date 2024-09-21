import { env } from '@app/auth-service/config/env'
import db from '@app/auth-service/lib/db'
import { zValidator } from '@hono/zod-validator'
import { loginSchema, registerSchema } from '@pkg/validation/auth'
import { hash, verify } from 'argon2'
import { Hono } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'
import { sign } from 'hono/jwt'

export const authRouter = new Hono()
  .post('/register', zValidator('form', registerSchema), async c => {
    try {
      const { email, password, name } = c.req.valid('form')

      const user = await db.user.findUnique({ where: { email } })

      if (user) {
        throw new HTTPException(400, { message: 'User already exists' })
      }

      const passwordHash = await hash(password)

      await db.user.create({
        data: {
          email,
          password: passwordHash,
          name
        }
      })

      return c.json({ message: 'User created successfully' }, 201)
    } catch (error) {
      console.error(error)
      if (error instanceof HTTPException) throw error
      throw new HTTPException(500, { message: 'Internal Server Error' })
    }
  })
  .post('/login', zValidator('form', loginSchema), async c => {
    try {
      const { email, password } = c.req.valid('form')

      const user = await db.user.findUnique({ where: { email } })

      if (!user) {
        throw new HTTPException(404, { message: 'User not found' })
      }

      if (!(await verify(user.password, password))) {
        throw new HTTPException(401, { message: 'Invalid password' })
      }

      const payload = { email, exp: Math.floor(Date.now() / 1000) + 60 * 60 }
      const token = await sign(payload, env.SECRET)

      const refreshToken = crypto.randomUUID()
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

      await db.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          expiresAt
        }
      })

      setCookie(c, 'access_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      })
      setCookie(c, 'refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      })

      return c.json({
        payload,
        token
      })
    } catch (error) {
      console.error(error)
      if (error instanceof HTTPException) throw error
      throw new HTTPException(500, { message: 'Internal Server Error' })
    }
  })
  .post('/refresh', async c => {
    try {
      const refreshToken = getCookie(c, 'refresh_token')
      if (!refreshToken) {
        throw new HTTPException(401, { message: 'Unauthorized' })
      }

      const dbToken = await db.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true }
      })

      if (!dbToken || dbToken.expiresAt < new Date()) {
        throw new HTTPException(401, { message: 'Refresh token expired' })
      }

      const newPayload = { email: dbToken.user.email, exp: Math.floor(Date.now() / 1000) + 60 * 60 }
      const newAccessToken = await sign(newPayload, env.SECRET)

      setCookie(c, 'access_token', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      })

      return c.json({ message: 'Token refreshed', accessToken: newAccessToken })
    } catch (error) {
      console.error(error)
      if (error instanceof HTTPException) throw error
      throw new HTTPException(500, { message: 'Internal Server Error' })
    }
  })
  .post('/verify', async c => {
    try {
      const accessToken = getCookie(c, 'access_token')

      if (!accessToken) {
        throw new HTTPException(401, { message: 'Unauthorized' })
      }

      const payload = await verify(accessToken, env.SECRET)
      if (!payload) {
        throw new HTTPException(401, { message: 'Unauthorized' })
      }

      return c.json({ authenticated: true, payload })
    } catch (error) {
      console.error(error)
      if (error instanceof HTTPException) throw error
      throw new HTTPException(500, { message: 'Internal Server Error' })
    }
  })
  .post('/logout', async c => {
    try {
      const refreshToken = getCookie(c, 'refresh_token')
      if (refreshToken) {
        await db.refreshToken.delete({ where: { token: refreshToken } })

        setCookie(c, 'access_token', '', {
          httpOnly: true,
          secure: true,
          maxAge: 0,
          sameSite: 'None'
        })
        setCookie(c, 'refresh_token', '', {
          httpOnly: true,
          secure: true,
          maxAge: 0,
          sameSite: 'None'
        })

        return c.json({ message: 'Logged out successfully' })
      } else {
        throw new HTTPException(400, { message: 'No refresh token found' })
      }
    } catch (error) {
      console.error(error)
      if (error instanceof HTTPException) throw error
      throw new HTTPException(500, { message: 'Internal Server Error' })
    }
  })
