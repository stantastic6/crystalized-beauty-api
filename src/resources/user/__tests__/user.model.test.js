import mongoose from 'mongoose'
import { User } from '../user.model'

const dbName = 'test-users'

const userData = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test-user@fake.com',
  password: 'password123',
  role: 'Customer',
}

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect(`${process.env.DB_URL}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
  })

  afterEach(async () => {
    await User.deleteMany()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('create and save a user', async () => {
    const validUser = new User(userData)
    const savedUser = await validUser.save()

    expect(savedUser._id).toBeDefined()
    expect(savedUser.firstName).toBe(userData.firstName)
    expect(savedUser.lastName).toBe(userData.lastName)
    expect(savedUser.email).toBe(userData.email)
  })

  it('encrypts user password before saving', async () => {
    const validUser = new User(userData)
    const savedUser = await validUser.save()

    expect(savedUser.password).not.toBe(userData.password)
  })

  it('only saves attributes defined in schema ', async () => {
    const validUser = new User({ ...userData, foo: 'bar' })
    const savedUser = await validUser.save()

    expect(savedUser._id).toBeDefined()
    expect(savedUser.foo).toBeUndefined()
  })

  it('fails when trying to create a user withour required field', async () => {
    let badUserData = {
      ...userData,
      password: null,
    }

    const invalidUser = new User(badUserData)
    let err

    try {
      await invalidUser.save()
    } catch (error) {
      err = error
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.password).toBeDefined()
  })
})
