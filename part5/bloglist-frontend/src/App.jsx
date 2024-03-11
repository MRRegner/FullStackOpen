import { useState, useEffect, useRef } from 'react'
import './index.css'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [NotificacionClass, setNotificacionClass] = useState(null)

  const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.sessionStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.sessionStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage('Login succesfull ')
      setNotificacionClass('success')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setNotificationMessage('Wrong user or password ')
      setNotificacionClass('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotificationMessage(
          `Added ${returnedBlog.title} by ${returnedBlog.author} `
        )
        setNotificacionClass('success')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const updateBlog = (blogObject) => {
    const editedBlog= {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
      likes: blogObject.likes + 1,
      user: blogObject.user.id,
      id: blogObject.id
    }
    blogService
      .update(editedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))
        setNotificationMessage(
          `Updated ${returnedBlog.title} by ${returnedBlog.author} `
        )
        setNotificacionClass('success')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const removeBlog = (blogObject) => {
    blogService
      .destroy(blogObject.id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        setNotificationMessage(`Deleted ${blogObject.title} by ${blogObject.author}`)
        setNotificacionClass('success')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const closeSession = () => {
    window.sessionStorage.removeItem(
      'loggedBlogappUser'
    )
    location.reload()

    setNotificationMessage('Session closed')
    setNotificacionClass('success')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }
  return (

    <div>
      <Notification message={notificationMessage} NotificacionClass={NotificacionClass} />
      {!user && <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password} />}
      {user && <div>
        <p>{user.name} logged in <button onClick={closeSession} >Logout</button></p>

        <Togglable buttonLabel="new blog" ref={blogFormRef} >
          <h2>create new</h2>
          <BlogForm createBlog={addBlog} />
        </Togglable>

        <h2>blogs</h2>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} removeBlog={removeBlog} />
        )}
      </div>
      }

    </div>
  )
}

export default App