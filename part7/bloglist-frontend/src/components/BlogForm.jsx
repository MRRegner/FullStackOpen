import React from 'react'
import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setnNewLikes] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  const handleLikesChange = (event) => {
    setnNewLikes(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const content = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    }
    dispatch(createBlog(content))
    dispatch(
      setNotification(`Added ${content.title} by ${content.author} `, 'success')
    )
  }

  return (
    <form onSubmit={addBlog}>
      <label>Title</label>
      <input
        value={newTitle}
        className='form-control'
        onChange={handleTitleChange}
        id='title-input'
      />
      <br />
      <label>author: </label>
      <input
        value={newAuthor}
        className='form-control'
        onChange={handleAuthorChange}
        id='author-input'
      />
      <br />
      <label> url: </label>
      <input
        value={newUrl}
        className='form-control'
        onChange={handleUrlChange}
        id='url-input'
      />
      <br />
      <label>likes:</label>
      <input
        value={newLikes}
        className='form-control'
        onChange={handleLikesChange}
        id='likes-input'
      />
      <br />
      <button type='submit' className='btn btn-primary'>
        add
      </button>
    </form>
  )
}

export default BlogForm
