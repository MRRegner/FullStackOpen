import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Blog = () => {
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)
  const sortBlog = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2>Create new</h2>
        <BlogForm />
      </Togglable>
      <ul className='list-group'>
        {sortBlog.map((blog) => (
          <Link
            to={`/blogs/${blog.id}`}
            className='list-group-item list-group-item-success'
            key={blog.id}
          >
            {blog.title}
          </Link>
        ))}
      </ul>
    </>
  )
}

export default Blog
