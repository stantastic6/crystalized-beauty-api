import { Router } from 'express'
import { createProduct, getProduct, getProducts } from './product.controller'

const router = Router()

router
  .route('/')
  .get(getProducts)
  .post(createProduct)

router.route('/:id').get(getProducts)

export default router
