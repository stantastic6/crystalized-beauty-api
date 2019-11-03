import * as express from 'express'
import { Request, Response } from 'express'
import { json, urlencoded } from 'body-parser'
import * as cors from 'cors'
import * as morgan from 'morgan'
import { connectToDb } from './utils/db'
import userRouter from './resources/user/user.router'
import * as dotenv from 'dotenv'

export const app = express()
dotenv.config()

app.disable('x-powered-by')
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

connectToDb()
app.get('/', (req: Request, res: Response) => res.send('Hello World'))
app.use('/api/users', userRouter)

export default app
