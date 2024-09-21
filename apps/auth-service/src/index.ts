import { readFileSync } from 'node:fs'
import { createSecureServer } from 'node:http2'
import { env } from '@app/auth-service/config/env'
import { authRouter } from '@app/auth-service/routes/auth'
import { userRouter } from '@app/auth-service/routes/user'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

export const app = new Hono()
  .basePath('/api')
  .use(cors({ origin: origin => origin || '*', credentials: true }))
  .use(logger())
  .route('/auth', authRouter)
  .route('/user', userRouter)

console.log(`🔐 Auth service is running on port ${env.PORT}`)

serve({
  fetch: app.fetch,
  createServer: createSecureServer,
  serverOptions: {
    key: readFileSync('key.pem'),
    cert: readFileSync('cert.pem')
  },
  port: env.PORT
})

export type AuthServiceType = typeof app
