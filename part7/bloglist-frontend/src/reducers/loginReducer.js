import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'loggedUser',
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload
    },
  },
})

export const { setLoggedUser } = loginSlice.actions

export const checkLoggedUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.sessionStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setLoggedUser(user))
    }
  }
}

export default loginSlice.reducer
