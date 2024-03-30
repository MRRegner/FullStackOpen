import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { updateBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import RemoveButton from './RemoveButton'

const BlogDetail = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogList = useSelector((state) => state.blogs)
  const blog = blogList.find((blog) => blog.id === id)
  if (!blog) {
    return null
  }

  const handleLikeClick = () => {
    event.preventDefault()

    dispatch(updateBlog(blog))
    dispatch(
      setNotification(`Updated ${blog.title} by ${blog.author} `, 'success')
    )
  }

  return (
    <div className='card' style={{ width: 18 + 'rem' }}>
      <div className='card-body'>
        <h5 className='card-title'>{blog.title}</h5>
        <p className='card-text'> {blog.url}</p>
        <p className='card-text'>likes {blog.likes}</p>
        <button onClick={() => handleLikeClick()} className='btn btn-success'>
          Like!
        </button>
        <br />
        <p className='card-text'>added by {blog.user.username}</p>
        <RemoveButton blog={blog} />
      </div>
    </div>
  )
}

export default BlogDetail
