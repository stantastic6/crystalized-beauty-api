import { User } from './user.model'
import { Request, Response } from 'express'
import { removeKeyFromObject } from '../../utils/helpers'

export const getUsers = async (req: Request, res: Response) => {
  await User.find((err, users) => {
    if (err) {
      return res.status(422).json({ error: 'Error retrieving users.' })
    }

    return res.status(200).json(users)
  }).lean()
}

export const getUser = async (req: Request, res: Response) => {
  const userId: string = req.params.id

  await User.findById({ _id: userId }, '-password', (err: any, user: any) => {
    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    return res.status(200).json(user)
  }).lean()
}

export const createUser = (req: Request, res: Response) => {
  // Validate input
  User.create(req.body, (err: any, user: any) => {
    if (err) {
      return res.status(422).json({ error: 'Error creating user' })
    }

    return res.status(200).json(removeKeyFromObject(user, 'password'))
  })
}

export const updateUser = async (req: Request, res: Response) => {
  const userId: string = req.params.id

  User.findOneAndUpdate({ _id: userId }, req.body, { new: true }, (err, user) => {
    if (!user) {
      return res.status(404).json({ error: 'User not fount' })
    }
    console.log(user)
    return res.status(200).json(user)
  }).lean()
}

export const deleteUser = (req: Request, res: Response) => {
  const userId: string = req.params.id

  User.findByIdAndDelete({ _id: userId }, (err, user) => {
    if (err) {
      return res.status(404).json({ error: 'User not fount' })
    }

    return res.status(200).json(user)
  }).lean()
}
