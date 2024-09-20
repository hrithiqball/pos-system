import { decode } from 'hono/jwt'

export function getPayloadFromToken(token: string) {
  try {
    const { payload } = decode(token)
    console.log(payload)
    return payload
  } catch (error) {
    console.error(error)
    throw new Error('Failed to decode token')
  }
}
