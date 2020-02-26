import { Product } from '../models/product.model';

export default {
  Query: {
    product: async (_: void, args: { id: string }) => {
      const product = await Product.findById({ _id: args.id }).exec();
      return product;
    },
    products: async () => {
      const products = await Product.find().exec();

      return products;
    },
  },
  Mutation: {
    createProduct: async (
      _: void,
      args: {
        name: string;
        description: string;
        imageUrl: string;
        prices: null;
        sku: string;
        unitsAvailable: number;
      }
    ) => {
      const product = await Product.create(args);
      return product;
    },
    updateProduct: async (
      _: void,
      args: {
        id: string;
        name: string;
        description: string;
        imageUrl: string;
        prices: null;
        sku: string;
        unitsAvailable: number;
      }
    ) => {
      const newProduct = await Product.findOneAndUpdate({ _id: args.id }, args, {
        new: true,
        runValidators: true,
      });
      return newProduct;
    },
    deleteProduct: async (_: void, args: { id: string }) => {
      const product = await Product.findByIdAndDelete({ _id: args.id });
      return product;
    },
  },
};
