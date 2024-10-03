import { createProductSchema, updateProductSchema } from '@pkg/validation/product'
import { z } from 'zod'

export type CreateProductSchema = z.infer<typeof createProductSchema>
export type UpdateProductSchema = z.infer<typeof updateProductSchema>
