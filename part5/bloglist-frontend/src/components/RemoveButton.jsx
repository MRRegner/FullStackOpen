const RemoveButton = ({ blog,user, removeBlog }) => {

  const handleRemoveclick = () => {
    event.preventDefault
    if (window.confirm(`Delete ${blog.title}?`)){
      removeBlog(blog)
    }
  }

  if (blog.user.name === user.name){
    return(
      <button onClick={handleRemoveclick} data-testid={blog.title}>Remove</button>
    )}
}


export default RemoveButton