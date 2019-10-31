import * as express from 'express'
import { Request, Response } from 'express'
import { json, urlencoded } from 'body-parser'
import * as cors from 'cors'
import * as morgan from 'morgan'
import { connectToDb } from './utils/db'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// connectToDb()
app.get('/', (req: Request, res: Response) => res.send('Hello World'))

export default app
