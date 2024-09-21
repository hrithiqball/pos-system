import { errorHandler } from '@pkg/validation/utils/error-handler'

import { authService } from '@/lib/hono'

export async function getUser(email: string | null) {
  try {
    if (!email) {
      throw new Error('Email is required')
    }

    const response = await authService.api.user[':email'].$get({ param: { email } })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}
