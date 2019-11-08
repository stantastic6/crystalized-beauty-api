import { Router } from 'express'
import { getOrders, getOrder } from './order.controller'

const router = Router()

router.route('/').get(getOrders)

router.route('/:id').get(getOrder)

export default router
