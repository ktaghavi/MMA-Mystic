import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import { useState,useEffect } from 'react'
import './App.css'

import NavBar from './components/Header/NavBar'

import Home from './components/pages/1.home/Home'
import Login from './components/pages/2.login/Login'
import SignUp from './components/pages/3.signup/SignUp'
import CompareFighters from './components/pages/4.compare-fighters/CompareFighters'
import PredictionsLibrary from './components/pages/5.predictions/PredictionsLibrary'
import Profile from './components/pages/6.profile/Profile'
import UpcomingEvents from './components/pages/7.upcoming-events/UpcomingEvents'
import PastEvents from './components/pages/8.past-events/PastEvents'
import Footer from './components/Footer/Footer'

function App() {  

  const [user,setUser] = useState(null)

  useEffect(() => {
    // Fetch the user's predictions from your backend
    fetch('/api/check_session')
      .then((response) => response.json())
      .then((data) => {
        if(user.username){
          setUser(data)
        }
      })
      .catch((error) => console.error('Error fetching user:', error));
  }, []);

  return (  
    <BrowserRouter>
    
      <NavBar user={user} setUser={setUser}/>

      <Routes>

        <Route path="/" element={<Home />}/>

        <Route path="/login" element={<Login setUser={setUser}/>}/>
        <Route path="/signup" element={<SignUp setUser={setUser}/>}/>
        <Route path='/upcoming-events' element={<UpcomingEvents />}/>
        <Route path='/past-events' element={<PastEvents />}/>
        <Route path='/compare-fighters' element={<CompareFighters />}/>
        <Route path='/predictions-library' element={<PredictionsLibrary user={user}/>}/>
        <Route path='/profile' element={<Profile setUser={setUser} user={user}/>}/>

      </Routes> 

      <Footer /> 
    
    </BrowserRouter>
  )
}
  
export default App
  
