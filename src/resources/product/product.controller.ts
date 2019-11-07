import { Product } from './product.model'
import { Request, Response } from 'express'

// @route GET api/products
// @desc GET all products
// @access Public
export const getProducts = async (req: Request, res: Response) => {
  await Product.find((err, products) => {
    if (err) {
      return res.status(422).json({ error: 'Error retrieving products.' })
    }

    return res.status(200).json(products)
  }).lean()
}

// @route GET api/products/:id
// @desc GET details of product with specified ID
// @access Public
export const getProduct = async (req: Request, res: Response) => {
  const productId: string = req.params.id

  await Product.findById({ _id: productId }, (err: any, product: any) => {
    if (err) {
      return res.status(422).json({ error: 'Error retrieving product.' })
    }

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' })
    }

    return res.status(200).json(product)
  }).lean()
}
