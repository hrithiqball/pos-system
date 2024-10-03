import type { AuthServiceType } from '@app/auth-service/type'
import type { PosServiceType } from '@app/pos-service/type'
import { hc } from 'hono/client'

import { AUTH_SERVICE_URL, POS_SERVICE_URL } from '@/constants/url'

export const authService = hc<AuthServiceType>(AUTH_SERVICE_URL, {
  fetch: (input: RequestInfo | URL, init: RequestInit | undefined) =>
    fetch(input, { ...init, credentials: 'include' })
})

const posApp = hc<PosServiceType>(POS_SERVICE_URL)
export const posService = posApp.api
