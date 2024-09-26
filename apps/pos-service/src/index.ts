import { readFileSync } from 'node:fs'
import { createSecureServer } from 'node:http2'
import { env } from '@app/pos-service/config/env'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { poweredBy } from 'hono/powered-by'

const app = new Hono()
  .get('/', c => c.text('Hello Hono!'))
  .basePath('/api')
  .use(cors({ origin: origin => origin || '*', credentials: true }))
  .use(poweredBy())
  .use(logger())

console.log(`POS Service is running on port ${env.PORT}`)

serve({
  fetch: app.fetch,
  createServer: createSecureServer,
  serverOptions: {
    key: readFileSync('key.pem'),
    cert: readFileSync('cert.pem'),
    allowHTTP1: true
  },
  port: env.PORT
})

export type PosServiceType = typeof app
