import { React} from 'react'
import { NavLink } from 'react-router-dom'
import'./NavBar.css'

function NavBar({currentUser}) {
  function handleLogout(){
    fetch('/api/logout', {
      method: 'DELETE',
    })
    setCurrentUser({})
  }
  const loggedOutNavBar = (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Log In</NavLink>
      </nav>
    </header>
  )
  const loggedInNavBar = (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink onClick={handleLogout} to="/">Log Out</NavLink>
      </nav>
    </header>
  )

return currentUser != undefined? loggedInNavBar : loggedOutNavBar

}

export default NavBar