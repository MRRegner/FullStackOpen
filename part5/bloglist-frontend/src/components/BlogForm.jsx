import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

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
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    })
  }

  return (
    <form onSubmit={addBlog}>

            title: 
            <input value={newTitle} 
            onChange={handleTitleChange} 
            id='title-input'
            /><br />

            author: 
            <input value={newAuthor} 
            onChange={handleAuthorChange} 
            id='author-input'
            /> <br />

            url: 
            <input value={newUrl}
             onChange={handleUrlChange} 
             id='url-input'
             /> <br />

            likes: 
            <input value={newLikes} 
            onChange={handleLikesChange} 
            id='likes-input'
            /> <br />
            
      <button type="submit">add</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm