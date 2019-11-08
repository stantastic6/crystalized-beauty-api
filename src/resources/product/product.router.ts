import { Router } from 'express'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './product.controller'

const router = Router()

router
  .route('/')
  .get(getProducts)
  .post(createProduct)

router
  .route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct)

export default router
