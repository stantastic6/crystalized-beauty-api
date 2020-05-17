import { User } from '../models/user.model';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { canEditUser, isAdmin } from '../utils/authorization';

export interface AuthedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  lastLogin: Date;
}

export interface UserIput {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: string;
}

export default {
  Query: {
    user: async (_: void, args: { id: string }, context: { currentUser: AuthedUser }) => {
      if (!context.currentUser || !canEditUser(context.currentUser, args.id)) {
        throw new ForbiddenError('You are unauthorized to perform this action.');
      }

      const user = await User.findById({ _id: args.id }, '-password').lean();

      // TODO: Handle not found
      return user;
    },
    users: async (_: void, args: void, context: { currentUser: AuthedUser }) => {
      if (!context.currentUser || !isAdmin(context.currentUser.role)) {
        throw new ForbiddenError('You are unauthorized to perform this action.');
      }

      const users = await User.find().lean();

      // TODO: Handle not found
      return users;
    },
  },
  Mutation: {
    createUser: async (_: void, args: { input: UserIput }, context: { currentUser: AuthedUser }) => {
      if (!context.currentUser || !isAdmin(context.currentUser.role)) {
        throw new ForbiddenError('You are unauthorized to perform this action.');
      }

      const newUser = await User.create(args.input);
      return newUser;
    },
    updateUser: async (
      _: void,
      args: { id: string; input: UserIput },
      context: { currentUser: AuthedUser }
    ) => {
      if (!context.currentUser || !canEditUser(context.currentUser, args.id)) {
        throw new ForbiddenError('You are unauthorized to perform this action.');
      }

      const newUser = await User.findOneAndUpdate({ _id: args.id }, args.input, {
        new: true,
        runValidators: true,
      });

      return newUser;
    },
    deleteUser: async (_: void, args: { id: string }, context: { currentUser: AuthedUser }) => {
      if (!context.currentUser || !isAdmin(context.currentUser.role)) {
        throw new ForbiddenError('You are unauthorized to perform this action.');
      }

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

      const jwtSecret: any = process.env.JWT_SECRET;

      const token = sign(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          lastLogin: user.lastLogin,
        },
        jwtSecret,
        { expiresIn: '1day' }
      );

      return { token };
    },
  },
};
