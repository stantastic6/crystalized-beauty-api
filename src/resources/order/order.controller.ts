import { Order } from './order.model'
import { Request, Response } from 'express'

// @route GET api/orders
// @desc GET all orders
// @access Public
export const getOrders = async (req: Request, res: Response) => {
  await Order.find((err, orders) => {
    if (err) {
      return res.status(422).json({ error: err, message: 'Error retrieving orders.' })
    }

    return res.status(200).json(orders)
  }).lean()
}

// @route GET api/order/:id
// @desc GET all orders
// @access Public
export const getOrder = async (req: Request, res: Response) => {
  const orderId: string = req.params.id

  await Order.findById({ _id: orderId }, (err, order) => {
    if (err) {
      return res.status(422).json({ error: err, message: 'Error retrieving order.' })
    }

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' })
    }

    return res.status(200).json(order)
  }).lean()
}

// @route POST api/products/
// @desc POST create product
// @access Public
export const createOrder = (req: Request, res: Response) => {
  // Validate input
  Order.create(req.body, (err: any, product: any) => {
    if (err) {
      return res.status(422).json({ message: 'Error creating product.', error: err })
    }

    return res.status(200).json(product)
  })
}

// @route PUT api/orders/:id
// @desc PUT update order
// @access Public
export const updateOrder = async (req: Request, res: Response) => {
  const orderId: string = req.params.id

  Order.findOneAndUpdate({ _id: orderId }, req.body, { new: true }, (err: any, order: any) => {
    if (err) {
      return res.status(422).json({ message: 'Error creating order.', error: err })
    }

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' })
    }

    return res.status(200).json(order)
  }).lean()
}

// @route DELETE api/orders/:id
// @desc DELETE delete order
// @access Public
export const deleteUser = (req: Request, res: Response) => {
  const orderId: string = req.params.id

  Order.findByIdAndDelete({ _id: orderId }, (err: any, order: any) => {
    if (err) {
      return res.status(422).json({ message: 'Error creating order.', error: err })
    }

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' })
    }

    return res.status(200).json(order)
  }).lean()
}
