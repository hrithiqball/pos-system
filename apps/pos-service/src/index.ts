import { readFileSync } from 'node:fs'
import { createSecureServer } from 'node:http2'
import { env } from '@app/pos-service/config/env'
import { productRouter } from '@app/pos-service/routes/product'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { poweredBy } from 'hono/powered-by'

export const app = new Hono()
  .get('/', c => c.text('POS service running!'))
  .basePath('/api')
  .use(cors({ origin: origin => origin || '*', credentials: true }))
  .use(poweredBy())
  .use(logger())
  .route('/product', productRouter)

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
