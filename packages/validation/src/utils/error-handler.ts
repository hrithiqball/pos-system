import { z } from 'zod'

export function errorHandler(error: unknown) {
  if (error instanceof z.ZodError) {
    return `Schema validation error: ${error.errors.map(err => `${err.code} ${err.message}`).join(', ')}`
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Unknown error'
}
