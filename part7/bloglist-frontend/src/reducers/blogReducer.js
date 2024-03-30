import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    toggleLike(state, action) {
      const id = action.payload.id

      return state.map((blog) => (blog.id !== id ? blog : action.payload))
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
  },
})

export const { toggleLike, addBlog, removeBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(addBlog(newBlog))
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    })
    dispatch(toggleLike({ ...blog, likes: blog.likes + 1 }))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.destroy(blog.id)
    dispatch(removeBlog(blog))
  }
}

export default blogSlice.reducer
