import { AuthedUser } from '../resolvers/user.resolver';

export const isAdmin = (userRole: string): boolean => userRole.toLowerCase() === 'admin';

export const canEditUser = (currentUser: AuthedUser, id: string): boolean =>
  isAdmin(currentUser.role) || currentUser.id === id;
