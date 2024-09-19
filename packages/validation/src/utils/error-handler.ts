import { z } from 'zod'

export function errorHandler(error: unknown) {
  if (error instanceof z.ZodError) {
    throw new Error(
      `Schema validation error: ${error.errors.map(err => `${err.code} ${err.message}`).join(', ')}`
    )
  }

  if (error instanceof Error) {
    throw new Error(error.message)
  }

  throw new Error('An error occurred')
}
