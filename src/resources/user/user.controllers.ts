import { User, IUser } from './user.model'
import { Request, Response, ErrorRequestHandler } from 'express'
import { removeKeyFromObject } from '../../utils/helpers'

export const getUser = async function(req: Request, res: Response) {
  const userId: string = req.params.id

  await User.findById(userId, '-password', (err: any, user: any) => {
    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    return res.status(200).json(user)
  })
}

export const createUser = function(req: Request, res: Response) {
  // Validate input
  User.create(req.body, (err: any, user: any) => {
    if (err) {
      return res.status(422).json({ error: 'Error creating user' })
    }

    return res.status(200).json(removeKeyFromObject(user, 'password'))
  })
}

export const updateUser = async function(req: Request, res: Response) {}

export const deleteUser = function(req: Request, res: Response) {}
