import { Router } from 'express'
import { getUser, createUser } from './user.controllers'

const router = Router()

router.route('/').post(createUser)

router.route('/:id').get(getUser)
export default router
