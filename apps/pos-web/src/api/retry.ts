import { errorHandler } from '@pkg/validation/utils/error-handler'

import { authService } from '@/lib/hono'

async function refresh() {
  try {
    const response = await authService.api.auth.refresh.$post()

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

export async function fetch<T>(fn: () => Promise<Response>): Promise<T> {
  try {
    const response = await fn()

    if (!response.ok) {
      if (response.status === 401) {
        await refresh()

        const retryResponse = await fn()

        if (!retryResponse.ok) {
          const errorMessage = await retryResponse.text()
          throw new Error(errorMessage)
        }

        return (await retryResponse.json()) as T
      }

      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }

    return (await response.json()) as T
  } catch (error) {
    const errorMessage = errorHandler(error)
    throw new Error(errorMessage)
  }
}
