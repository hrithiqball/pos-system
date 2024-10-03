import { z } from 'zod'

export const productSchema = z.object({
  id: z.string().nanoid(),
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().positive(),
  typeId: z.string().nanoid(),
  image: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})

export const createProductSchema = productSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})

export const updateProductSchema = productSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})
