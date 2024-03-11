const Notification = ({ message, NotificacionClass }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={NotificacionClass}>
      {message}
    </div>
  )
}

export default Notification
