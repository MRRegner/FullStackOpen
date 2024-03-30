import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <table className="table table-success">
        <thead className="table-success">
          <tr  className="table-success">
            <th scope="col" className="table-success">Users</th>
            <th scope="col" className="table-success"> blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td className="table-success"><Link to={`/users/${user.id}`} className='table-success'>{user.name} </Link></td>
              <td className="table-success">{user.blogs.length} </td>
            </tr>
          )
          }
        </tbody>
      </table>
    </div>
  )

}


export default Users