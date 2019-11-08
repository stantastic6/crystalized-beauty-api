import { Router } from 'express'
import { createOrder, deleteOrder, getOrders, getOrder, updateOrder } from './order.controller'

const router = Router()

router
  .route('/')
  .get(getOrders)
  .post(createOrder)

router
  .route('/:id')
  .get(getOrder)
  .put(updateOrder)
  .delete(deleteOrder)

export default router
