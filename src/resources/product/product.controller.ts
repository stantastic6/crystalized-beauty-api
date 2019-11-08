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

// @route POST api/products/
// @desc POST create product
// @access Public
export const createProduct = (req: Request, res: Response) => {
  // Validate input
  Product.create(req.body, (err: any, product: any) => {
    if (err) {
      return res.status(422).json({ msg: 'Error creating product', error: err })
    }

    return res.status(200).json(product)
  })
}

// @route PUT api/products/:id
// @desc PUT update product
// @access Public
export const updateProduct = async (req: Request, res: Response) => {
  const productId: string = req.params.id

  Product.findOneAndUpdate({ _id: productId }, req.body, { new: true }, (err: any, product: any) => {
    if (err) {
      return res.status(422).json({ message: 'Error creating product.', error: err })
    }

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' })
    }

    return res.status(200).json(product)
  }).lean()
}

// @route DELETE api/products/:id
// @desc DELETE delete product
// @access Public
export const deleteProduct = (req: Request, res: Response) => {
  const productId: string = req.params.id

  Product.findByIdAndDelete({ _id: productId }, (err: any, product: any) => {
    if (err) {
      return res.status(422).json({ message: 'Error creating product.', error: err })
    }

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' })
    }

    return res.status(200).json(product)
  }).lean()
}
