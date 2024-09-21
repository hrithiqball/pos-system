import { User } from '@app/auth-service/types/user'
import { errorHandler } from '@pkg/validation/utils/error-handler'

import { fetch } from '@/api/retry'
import { authService } from '@/lib/hono'

export async function getUser(email: string | null) {
  try {
    if (!email) {
      throw new Error('Email is required')
    }

    return await fetch<User>(() => authService.api.user[':email'].$get({ param: { email } }))
  } catch (error) {
    const errorMessage = errorHandler(error)
    throw new Error(errorMessage)
  }
}
