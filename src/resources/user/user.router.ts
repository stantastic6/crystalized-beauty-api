import { Router } from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser } from './user.controllers'

const router = Router()

router
  .route('/')
  .get(getUsers)
  .post(createUser)

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

export default router
