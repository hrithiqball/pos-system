import db from '@app/pos-service/lib/db'
import { zValidator } from '@hono/zod-validator'
import { createProductSchema, updateProductSchema } from '@pkg/validation/product'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { nanoid } from 'nanoid'

export const productRouter = new Hono()
  .post('/', zValidator('json', createProductSchema), async c => {
    try {
      const formData = c.req.valid('json')

      const product = await db.product.create({
        data: {
          id: nanoid(),
          ...formData
        }
      })

      return c.json(product, 201)
    } catch (error) {
      console.error(error)
      if (error instanceof HTTPException) throw error
      throw new HTTPException(500, { message: 'Internal Server Error' })
    }
  })
  // TODO: add filter, pagination, and sorting
  .get('/', async c => {
    try {
      const products = await db.product.findMany()

      return c.json(products)
    } catch (error) {
      console.error(error)
      if (error instanceof HTTPException) throw error
      throw new HTTPException(500, { message: 'Internal Server Error' })
    }
  })
  .get('/:id', async c => {
    try {
      const { id } = c.req.param()

      const product = await db.product.findUnique({ where: { id } })

      if (!product) {
        throw new HTTPException(404, { message: 'Product not found' })
      }

      return c.json(product)
    } catch (error) {
      console.error(error)
      if (error instanceof HTTPException) throw error
      throw new HTTPException(500, { message: 'Internal Server Error' })
    }
  })
  .patch('/:id', zValidator('json', updateProductSchema), async c => {
    try {
      const { id } = c.req.param()
      const formData = c.req.valid('json')

      const product = await db.product.findUnique({ where: { id } })

      if (!product) {
        throw new HTTPException(404, { message: 'Product not found' })
      }

      const updatedProduct = await db.product.update({
        where: { id },
        data: {
          ...formData
        }
      })

      return c.json(updatedProduct)
    } catch (error) {
      console.error(error)
      if (error instanceof HTTPException) throw error
      throw new HTTPException(500, { message: 'Internal Server Error' })
    }
  })
  .delete('/:id', async c => {
    try {
      const { id } = c.req.param()

      const product = await db.product.findUnique({ where: { id } })

      if (!product) {
        throw new HTTPException(404, { message: 'Product not found' })
      }

      await db.product.delete({ where: { id } })

      return c.json({ message: 'Product deleted' })
    } catch (error) {
      console.error(error)
      if (error instanceof HTTPException) throw error
      throw new HTTPException(500, { message: 'Internal Server Error' })
    }
  })
