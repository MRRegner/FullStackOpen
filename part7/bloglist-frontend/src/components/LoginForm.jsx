import React from 'react'
import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setLoggedUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.sessionStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setLoggedUser(user))
      setUsername('')
      setPassword('')
      dispatch(setNotification('Login succesfull ', 'success'))
    } catch (exception) {
      dispatch(setNotification('Wrong user or password ', 'error'))
    }
  }

  return (
    <div className='mx-auto' style={{ maxWidth: 500 + 'px' }}>
      <h1>login</h1>
      <form onSubmit={handleLogin} className=''>
        <div className='mb-3'>
          <label className='form-label'>username</label>

          <input
            className='form-control'
            data-testid='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>password</label>
          <input
            className='form-control'
            data-testid='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
