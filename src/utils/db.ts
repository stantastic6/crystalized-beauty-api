import { connect } from 'mongoose'

export const connectToDb = async (options?: {}) => {
  const url: string = process.env.DB_URL!

  return await connect(
    url,
    {
      ...options,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
}
