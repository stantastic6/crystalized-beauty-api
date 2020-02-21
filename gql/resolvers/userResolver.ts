import { User } from '../models/user.model';

export default {
  Query: {
    user: async (_: any, args: { id: string }) => {
      const user = await User.findById({ _id: args.id }, '-password').lean();
      // TODO: Handle error
      return user;
    },
    users: async () => {
      const users = await User.find().exec();

      // TODO: Handle error
      return users;
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      args: { firstName: string; lastName: string; email: string; password: string }
    ) => {
      const newUser = User.create(args);
      return newUser;
    },
    updateUser: async (
      _: any,
      args: { id: string; firstName: string; lastName: string; email: string; password: string; role: string }
    ) => {
      const newUser = User.findOneAndUpdate({ _id: args.id }, args, {
        new: true,
        runValidators: true,
      });

      return newUser;
    },
    deleteUser: async (_: any, args: { id: string }) => {
      const user = User.findByIdAndDelete({ _id: args.id });
      return user;
    },
  },
};
