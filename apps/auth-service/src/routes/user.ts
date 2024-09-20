import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

import db from '../lib/db'
import { authMiddleware } from '../middlewares/auth'

export const userRouter = new Hono()
  .get('/me/:userId', authMiddleware, async c => {
    try {
      const { userId } = c.req.param()

      const user = await db.user.findUnique({ where: { id: Number(userId) } })

      if (!user) {
        throw new HTTPException(404, { message: 'User not found' })
      }

      return c.json(user)
    } catch (error) {
      console.error(error)
      if (error instanceof HTTPException) throw error
      throw new HTTPException(500, { message: 'Internal Server Error' })
    }
  })
  .get('/:email', async c => {
    try {
      const { email } = c.req.param()

      const user = await db.user.findUnique({ where: { email } })

      if (!user) {
        throw new HTTPException(404, { message: 'User not found' })
      }

      return c.json(user)
    } catch (error) {
      console.error(error)
      if (error instanceof HTTPException) throw error
      throw new HTTPException(500, { message: 'Internal Server Error' })
    }
  })
