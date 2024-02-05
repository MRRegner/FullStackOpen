const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const userHelper = require('./user_test_helper')
const User = require('../models/user')

const initialUsers = userHelper.listOfUsers


beforeEach(async () => {
  await User.deleteMany({})

  for (let user of initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }
})

describe('Get tests', () => {
  test('users are returned as json', async () => {
    console.log('entered test')
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
  })
})

describe('post tests', () => {
  test('a valid User can be added', async () => {
    const newUser = userHelper.newUser[0]

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length + 1)

    const contents = usersAtEnd.map(n => n.username)

    expect(contents).toContain(
      'john123'
    )
  })

  test('a User with invalid username cannot be added', async () => {
    const userWithShortName = userHelper.userWithShortName[0]
    const response = await api
      .post('/api/users')
      .send(userWithShortName)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error)
      .toContain('is shorter than the minimum allowed length (3).')
    console.log(response.body.error)

  })

  test('a User with invalid password cannot be added', async () => {
    const userWithShortPassword = userHelper.userWithShortPassword[0]
    const response = await api
      .post('/api/users')
      .send(userWithShortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error)
      .toContain('password with at least 3 characters must be provided')
    console.log(response.body.error)

  })
  test('a User without password cannot be added', async () => {
    const userWithoutPassword = userHelper.userWithoutPassword[0]
    const response = await api
      .post('/api/users')
      .send(userWithoutPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error)
      .toContain('password with at least 3 characters must be provided')
    console.log(response.body.error)

  })
  test('a User whose username already exists cannot be added', async () => {
    const alreadyCreatedUser = userHelper.alreadyCreatedUser[0]
    const response = await api
      .post('/api/users')
      .send(alreadyCreatedUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error)
      .toContain('User validation failed: username: Error, expected `username` to be unique')
    console.log(response.body.error)

  })

})