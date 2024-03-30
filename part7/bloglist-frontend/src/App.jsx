import { useEffect } from 'react'
import './index.css'

import Blog from './components/Blog'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'

import { checkLoggedUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'

import { useDispatch, useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Routes, Route} from "react-router-dom"
import NavBar from './components/NavBar'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(checkLoggedUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  return (
    <Router>
      <div className='container'>
        <Notification />
        {!user && <LoginForm />}
        {user && <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Blog />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
          </Routes>
        </div>
        }
      </div>
    </Router>
  )
}

export default App