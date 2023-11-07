import { NavLink } from 'react-router-dom'
import'./NavBar.css'

function NavBar({user,setUser}) {

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
        <p>Welcome {user?.username}!</p>

        <NavLink to="/">Home</NavLink>
        <NavLink to="/upcoming-events">Upcoming Events</NavLink>
        <NavLink to="/past-events">Past Events</NavLink>
        <NavLink to="/compare-fighters">Compare Fighters</NavLink>
        <NavLink to="/predictions-library">Predictions Library</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to='/' onClick={() => {
          fetch("/api/logout", {method: "DELETE"})
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response error");
            }
          })
          .then(() => {
            setUser(null)
          })
        }}>Log Out</NavLink>      
      </nav>
    </header>
  )
  return user === null ? loggedOutNav : loggedInNav 
}

export default NavBar