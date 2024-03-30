import { useSelector } from "react-redux"
import { useParams } from 'react-router-dom'

const UserDetail = () => {

    const id = useParams().id
    const userList = useSelector(state => state.users)
    const user = userList.find(user => user.id === (id))

    if (!user) {
        return null
    }

    return (
        <>
            <h1>{user.name}</h1>

            <div className="card" style={{ width: 18 + 'rem' }}>
                <div className="card-body">
                    <h5 className="card-title">added blogs</h5>
                    {user.blogs.map(blog =>
                        <p key={blog.id} className="card-text success">{blog.title}</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default UserDetail