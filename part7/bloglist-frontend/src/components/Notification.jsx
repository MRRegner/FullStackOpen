import { useSelector } from "react-redux"

const Notification = () => {

  const notification = useSelector(state => state.notification)
  
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.class}>
      {notification.notification}
    </div>
  )
}

export default Notification
