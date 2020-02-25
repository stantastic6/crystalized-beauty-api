import { Order } from '../models/order.model';

export interface OrderInput {
  amount: number;
  userId: string;
  productIds: string[];
}

export default {
  Query: {
    order: async (_: any, args: { id: string }) =>
      Order.findById({ _id: args.id })
        .populate('user')
        .populate('products')
        .exec(),
    orders: async () =>
      Order.find()
        .populate('user')
        .populate('products')
        .exec(),
  },
  Mutation: {
    createOrder: async (_: any, args: { input: OrderInput }) => {
      const order = await Order.create(args.input);
      return order;
    },
    updateProduct: async (_: any, args: { id: string; input: OrderInput }) => {
      const newOrder = await Order.findOneAndUpdate({ _id: args.id }, args.input, {
        new: true,
        runValidators: true,
      });
      return newOrder;
    },
    deleteProduct: async (_: any, args: { id: string }) => {
      const order = await Order.findByIdAndDelete({ _id: args.id });
      return order;
    },
  },
};
