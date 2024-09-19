import { loginSchema, registerSchema } from '@pkg/validation/auth'
import { z } from 'zod'

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>
