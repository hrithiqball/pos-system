import type { AuthServiceType } from '@app/auth-service/index'
import type { PosServiceType } from '@app/pos-service/index'
import { hc } from 'hono/client'

import { AUTH_SERVICE_URL, POS_SERVICE_URL } from '@/constants/url'

export const authService = hc<AuthServiceType>(AUTH_SERVICE_URL, {
  fetch: (input: RequestInfo | URL, init: RequestInit | undefined) =>
    fetch(input, { ...init, credentials: 'include' })
})

export const posService = hc<PosServiceType>(POS_SERVICE_URL, {
  fetch: (input: RequestInfo | URL, init: RequestInit | undefined) =>
    fetch(input, { ...init, credentials: 'include' })
})
