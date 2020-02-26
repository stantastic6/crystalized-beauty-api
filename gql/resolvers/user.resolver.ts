import { User } from '../models/user.model';
import { AuthenticationError } from 'apollo-server-express';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export interface AuthedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  lastLogin: Date;
}

export default {
  Query: {
    user: async (_: void, args: { id: string }) => {
      const user = await User.findById({ _id: args.id }, '-password').lean();
      // TODO: Handle error
      return user;
    },
    users: async () => {
      const users = await User.find().lean();

      // TODO: Handle error
      return users;
    },
  },
  Mutation: {
    createUser: async (
      _: void,
      args: { firstName: string; lastName: string; email: string; password: string }
    ) => {
      const newUser = await User.create(args);
      return newUser;
    },
    updateUser: async (
      _: void,
      args: { id: string; firstName: string; lastName: string; email: string; password: string; role: string }
    ) => {
      const newUser = await User.findOneAndUpdate({ _id: args.id }, args, {
        new: true,
        runValidators: true,
      });

      return newUser;
    },
    deleteUser: async (_: void, args: { id: string }) => {
      const user = await User.findByIdAndDelete({ _id: args.id });
      return user;
    },
    login: async (_id: any, args: { email: string; password: string }) => {
      const user = await User.findOne({ email: args.email }).exec();

      if (!user) {
        throw new AuthenticationError('Invalid email or password.');
      }

      const passwordsMatch = compareSync(args.password, user.password);

      if (!passwordsMatch) {
        throw new AuthenticationError('Invalid email or password.');
      }

      return sign(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          lastLogin: user.lastLogin,
        },
        'changethis',
        { expiresIn: '1day' }
      );
    },
  },
};
