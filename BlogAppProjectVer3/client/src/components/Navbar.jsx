import React, { useContext } from 'react'
import Logo from '../img/logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to={"/"}>
          <img className='logoImg' src={Logo} alt='' />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to="/?category=art">
            <h6>Art</h6>
          </Link>
          <Link className='link' to="/?category=science">
            <h6>Science</h6>
          </Link>
          <Link className='link' to="/?category=technology">
            <h6>Technology</h6>
          </Link>
          <Link className='link' to="/?category=cinema">
            <h6>Cinema</h6>
          </Link>
          <Link className='link' to="/?category=design">
            <h6>Design</h6>
          </Link>
          <Link className='link' to="/?category=food">
            <h6>Food</h6>
          </Link>
          <span>{currentUser?.user_name}</span>
          {
          currentUser ? (
          <span onClick={logout}>Logout</span>
        ) :  (
          <Link className='link' to={"/login"}>Login</Link>
          )}
          <span className='write'>
            <Link className='link' to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar