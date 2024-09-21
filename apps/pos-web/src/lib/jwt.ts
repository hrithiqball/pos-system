import { decode } from 'hono/jwt'

export function getPayloadFromToken(token: string) {
  try {
    const { payload } = decode(token)
    return payload
  } catch (error) {
    console.error(error)
    return null
  }
}
