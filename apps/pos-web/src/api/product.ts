import type { Product } from '@app/pos-service/types/product'
import type { CreateProductSchema, UpdateProductSchema } from '@pkg/validation/types/product'
import { errorHandler } from '@pkg/validation/utils/error-handler'

import { fetch } from '@/api/retry'
import { posService } from '@/lib/hono'

export const $createProduct = posService.product.$post
export async function createProduct(json: CreateProductSchema) {
  try {
    const response = await posService.product.$post({ json })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    const errorMessage = errorHandler(error)
    throw new Error(errorMessage)
  }
}

export async function getProducts() {
  try {
    return await fetch<Product[]>(() => posService.product.$get())
  } catch (error) {
    errorHandler(error)
  }
}

export async function getProduct(id: string) {
  try {
    return await fetch<Product>(() => posService.product[':id'].$get({ param: { id } }))
  } catch (error) {
    errorHandler(error)
  }
}

export const $updateProduct = posService.product[':id'].$patch
export async function updateProduct(id: string, json: UpdateProductSchema) {
  try {
    const response = await posService.product[':id'].$patch({ param: { id }, json })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

export const $deleteProduct = posService.product[':id'].$delete

export async function deleteProduct(id: string) {
  try {
    const response = await posService.product[':id'].$delete({ param: { id } })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}
