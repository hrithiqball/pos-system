import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import { env } from './config/env'
import { authRouter } from './routes/auth'
import { userRouter } from './routes/user'

export const app = new Hono()
  .basePath('/api')
  .use(cors())
  .use(logger())
  .route('/auth', authRouter)
  .route('/user', userRouter)

console.log(`🔐 Auth service is running on port ${env.PORT}`)

serve({
  fetch: app.fetch,
  port: env.PORT
})

export type AuthServiceType = typeof app
