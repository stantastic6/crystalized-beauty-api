import { Schema, Document, model, Model } from 'mongoose'

export interface IProduct extends Document {
  description: string
  imageUrl: string
  name: string
  price: number
  sku: string
  unitsAvailable: number
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
  },
  { timestamps: true }
)

export const Product: Model<IProduct> = model<IProduct>('product', productSchema)
