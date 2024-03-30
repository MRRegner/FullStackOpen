import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NavBar = () => {
  const user = useSelector((state) => state.user)

  const closeSession = () => {
    window.sessionStorage.removeItem('loggedBlogappUser')
    location.reload()
  }

  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand href='/'>Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Link to='/' className='nav-link'>
              {' '}
              BLOGS
            </Link>
            <Link to='/users' className='nav-link'>
              {' '}
              USERS{' '}
            </Link>
            <span className='nav-link active'>
              <b>{user.name} logged in</b>{' '}
            </span>
            <button onClick={closeSession} className='btn btn-outline-success'>
              Logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
