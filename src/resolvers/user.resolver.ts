import { User } from '../models/user.model';
import { ApolloError, AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { compareSync } from 'bcryptjs';
import { canEditUser, isAdmin, signAuthedUser } from '../utils/authorization';

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

      if (!user) {
        throw new ApolloError('User not found', 'NOT_FOUND');
      }

      return user;
    },
    users: async (_: void, args: void, context: { currentUser: AuthedUser }) => {
      if (!context.currentUser || !isAdmin(context.currentUser.role)) {
        throw new ForbiddenError('You are unauthorized to perform this action.');
      }

      return await User.find().lean();
    },
  },
  Mutation: {
    createUser: async (_: void, args: { input: UserIput }, context: { currentUser: AuthedUser }) => {
      if (!context.currentUser || !isAdmin(context.currentUser.role)) {
        throw new ForbiddenError('You are unauthorized to perform this action.');
      }

      const user = await User.create(args.input);

      const token = signAuthedUser(user.toObject());

      return { token };
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

      if (!newUser) {
        throw new ApolloError('User not found', 'NOT_FOUND');
      }

      return newUser;
    },
    deleteUser: async (_: void, args: { id: string }, context: { currentUser: AuthedUser }) => {
      if (!context.currentUser || !isAdmin(context.currentUser.role)) {
        throw new ForbiddenError('You are unauthorized to perform this action.');
      }

      const user = await User.findByIdAndDelete({ _id: args.id });

      if (!user) {
        throw new ApolloError('User not found', 'NOT_FOUND');
      }

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

      const token = signAuthedUser(user.toObject());

      return { token };
    },
  },
};
