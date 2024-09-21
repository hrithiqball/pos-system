import { LoginSchema } from '@pkg/validation/types/auth'
import { errorHandler } from '@pkg/validation/utils/error-handler'

import { authService } from '@/lib/hono'

export const $login = authService.api.auth.login.$post
export async function login(form: LoginSchema) {
  try {
    const response = await authService.api.auth.login.$post({ form })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

export const $refresh = authService.api.auth.refresh.$post
export async function refresh() {
  try {
    const response = await authService.api.auth.refresh.$post({})

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

export const $logout = authService.api.auth.logout.$post
export async function logout() {
  try {
    const response = await authService.api.auth.logout.$post({})

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}
