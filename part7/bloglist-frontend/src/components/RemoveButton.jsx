import { deleteBlog } from "../reducers/blogReducer"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const RemoveButton = ({ blog }) => {

  const user = useSelector(state => state.user)
  const dispatch= useDispatch()

  const handleRemoveclick = () => {
    event.preventDefault
    if (window.confirm(`Delete ${blog.title}?`)){
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`Deleted ${blog.title} by ${blog.author}`,'success'))
      location.replace("/")
    }
  }

  if (blog.user.name === user.name){
    return(
      <button onClick={handleRemoveclick} data-testid={blog.title} className="btn btn-primary">Remove</button>
    )}
}


export default RemoveButton