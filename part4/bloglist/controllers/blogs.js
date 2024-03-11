const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

const userExtractor = middleware.userExtractor
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blogs = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor,async (request, response) => {
  const body = request.body
  const token = request.token
  const user = request.user

  const decodedToken = jwt.verify(token, process.env.SECRET)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  
  if (!blog.title && !blog.url) {
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
 

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: body.user
  }
  if (!blog.title && !blog.url) {
    response.status(400).end()
  } else{
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

      response.json(updatedBlog)
    }  
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

  const id = request.params.id
  const token = request.token
  const user = request.user
  const blog = await Blog
  .findById(id)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Invalid token' })
  }
})

module.exports = blogsRouter