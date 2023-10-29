import { React} from 'react'
import { NavLink } from 'react-router-dom'
import'./NavBar.css'
import useUserStore from '../../hooks/userStore'

function NavBar() {
  const {user, deleteUser} = useUserStore();

  const loggedOutNav = (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </nav>
    </header>
  )
  const loggedInNav = (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/upcoming-events">Upcoming Events</NavLink>
        <NavLink to="/past-events">Past Events</NavLink>
        <NavLink to="/compare-fighters">Compare Fighters</NavLink>
        <NavLink to="/predictions">Predictions</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to='/' onClick={() => {
          fetch("/api/logout", {method: "DELETE"})
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response error");
            }
          })
          .then(() => {
            deleteUser()
          })
        }}>Log Out</NavLink>      
      </nav>
    </header>
  )
  return user? loggedInNav : loggedOutNav
}

export default NavBar