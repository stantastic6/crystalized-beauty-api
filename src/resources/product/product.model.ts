import { Schema, Document, model, Model } from 'mongoose'
import { NextFunction } from 'express'
import * as slug from 'slug'

export interface IProduct extends Document {
  description: string
  imageUrl?: string
  name: string
  price: number
  sku: string
  unitsAvailable: number
  slug?: string
}

const productSchema: Schema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    price: {
      // Price in cents
      type: Number,
      required: true,
      min: 0,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    unitsAvailable: {
      type: Number,
      required: true,
      default: 0,
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
)

productSchema.pre<IProduct>('save', function(next: NextFunction) {
  this.slug = slug(this.name)

  next()
})

export const Product: Model<IProduct> = model<IProduct>('product', productSchema)
