import { AuthedUser } from '../resolvers/user.resolver';
import { sign } from 'jsonwebtoken';

export const isAdmin = (userRole: string): boolean => userRole.toLowerCase() === 'admin';

export const canEditUser = (currentUser: AuthedUser, id: string): boolean =>
  isAdmin(currentUser.role) || currentUser.id === id;

export const signAuthedUser = (user: AuthedUser): string => {
  const { id, firstName, lastName, email, role, lastLogin } = user;
  const jwtSecret: any = process.env.JWT_SECRET;

  return sign(
    {
      id,
      firstName,
      lastName,
      email,
      role,
      lastLogin,
    },
    jwtSecret,
    { expiresIn: '1day' }
  );
};
