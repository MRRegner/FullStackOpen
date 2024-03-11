import { useState } from 'react'
import RemoveButton from './RemoveButton'

const Blog = ({ blog, updateBlog, user, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikeClick = () => {
    event.preventDefault()
    updateBlog(blog)
  }

  return(
    <div style={blogStyle}>
      <span data-testid='title'>{blog.title}</span>

      <button onClick={toggleVisibility} style={hideWhenVisible}>view</button>
      <button onClick={toggleVisibility} style={showWhenVisible}>hide</button>
      <div style={showWhenVisible} key={blog.id} id='blogDetails'>

        {blog.url}<br/>
        <span>likes {blog.likes}</span>
        <button onClick={handleLikeClick}>like</button><br/>
        {blog.author}<br/>
        <RemoveButton blog={blog} user={user} removeBlog={removeBlog}/>

      </div>
    </div>
  )
}

export default Blog