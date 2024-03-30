import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return {
        notification: action.payload.message,
        class: action.payload.classType,
      }
    },
  },
})

export const { createNotification } = notificationSlice.actions

export const setNotification = (message, classType) => {
  return async (dispatch) => {
    dispatch(createNotification({ message, classType }))

    setTimeout(() => {
      dispatch(createNotification({ message: null, classType: null }))
    }, 5000)
  }
}
export default notificationSlice.reducer
