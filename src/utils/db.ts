import { connect } from 'mongoose'
// import options from '../server'

export const connectToDb = (options: {}) => {
  const url: string = process.env.DB_URL!

  return connect(
    url,
    { ...options, useNewUrlParser: true }
  )
}
