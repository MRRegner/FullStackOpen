const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const dummyBlogs = require('./blog_test_helper')
const api = supertest(app)
const helper = require('./test_helper')
const userHelper = require('./user_test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = dummyBlogs.listWithSeveralBlogs
const initialUsers = userHelper.listOfUsers
const userForLogin = userHelper.userForLogin[0]
const newBlog = dummyBlogs.listWithOneBlog[0]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
  await User.deleteMany({})

  for (let user of initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }

})

describe('Get tests', () => {
  test('blogs are returned as json', async () => {
    console.log('entered test')
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('unique identifier as id,  as DB names it _id by default', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('Post tests', () => {
  let token
  beforeEach(async () => {
    const login = await api
      .post('/api/login')
      .send(userForLogin)

    token = { 'Authorization': `bearer ${login.body.token}` }
  })
  test('a valid blog can be added', async () => {

    await api
      .post('/api/blogs')
      .set(token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)

    expect(contents).toContain(
      'Go To Statement Considered Harmful'
    )
  })

  test('a blog cannot be added without token', async () => {

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    expect(response.body.error).toContain('jwt must be provided')

  })

  test('If likes property does not exist, its value is 0', async () => {
    const blogWithoutLikes = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
    }
    const response = await api
      .post('/api/blogs')
      .set(token)
      .send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('If request lacks title and url properties backends responds with 400', async () => {
    const invalidBlog = {
      author: 'Someone who doesnt have an url or tittle for a blog'
    }
    await api
      .post('/api/blogs')
      .set(token)
      .send(invalidBlog)
      .expect(400)

  })
})

afterAll(() => {
  mongoose.connection.close()
})