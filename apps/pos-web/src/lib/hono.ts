import { AuthServiceType } from '@app/auth-service/index'
import { hc } from 'hono/client'

import { AUTH_SERVICE_URL } from '@/constants/url'

export const authService = hc<AuthServiceType>(AUTH_SERVICE_URL)
